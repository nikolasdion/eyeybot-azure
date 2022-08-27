import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { ServerResponse } from "http";
import { Telegraf } from "telegraf";

const BOT_TOKEN = process.env.BOT_TOKEN ?? "";
const WEBHOOK_ADDRESS = process.env.WEBHOOK_ADDRESS ?? "";

const bot = new Telegraf(BOT_TOKEN, { telegram: { webhookReply: true } });

bot.telegram.setWebhook(WEBHOOK_ADDRESS);

bot.on("text", (context) => {
  const echo = getEcho(context.message.text);
  if (echo) context.reply(echo);
});

const getEcho = (text: string): string | undefined => {
  let echo;

  const echoedWords = ["ey", "ea", "gelow", "anying"];
  echoedWords.forEach((word) => {
    const firstChars = text.substring(0, word.length);
    if (firstChars.toLowerCase() === word) echo = firstChars;
  });

  return echo;
};

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log(`HTTP trigger function processed a request ${req}`);
  bot.handleUpdate(req.body, context.res as ServerResponse);
};

export default httpTrigger;
