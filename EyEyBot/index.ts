import { AzureFunction } from "@azure/functions";
import { ServerResponse } from "http";
import { Telegraf } from "telegraf";

const ECHOED_WORDS = ["ey", "ea", "gelow", "anying"];

const bot = new Telegraf(process.env.BOT_TOKEN ?? "", {
  telegram: { webhookReply: true },
});

bot.telegram.setWebhook(process.env.WEBHOOK_ADDRESS ?? "");

bot.on("text", (context) => {
  const text = context.message.text;

  ECHOED_WORDS.forEach((word) => {
    const firstChars = text.substring(0, word.length);
    if (firstChars.toLowerCase() === word) {
      context.reply(firstChars);
    }
  });
});

const httpTrigger: AzureFunction = async (context, req) => {
  context.log(`HTTP trigger function processed a request`);
  bot.handleUpdate(req.body, context.res as ServerResponse);
};

export default httpTrigger;
