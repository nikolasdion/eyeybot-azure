import { AzureFunction, HttpRequest } from "@azure/functions";
import { ServerResponse } from "http";
import { Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

const ECHOED_WORDS = ["ey", "ea", "gelow", "anying"];

const bot = new Telegraf(process.env.BOT_TOKEN ?? "", {
  telegram: { webhookReply: true },
});

void bot.telegram.setWebhook(process.env.WEBHOOK_ADDRESS ?? "");

bot.on("text", (context) => {
  const text = context.message.text;

  ECHOED_WORDS.forEach((word) => {
    const firstChars = text.substring(0, word.length);
    if (firstChars.toLowerCase() === word) {
      void context.reply(firstChars);
    }
  });
});

const httpTrigger: AzureFunction = async (context, req: HttpRequest) => {
  context.log(`HTTP trigger function processed a request`);
  await bot.handleUpdate(req?.body as Update, context.res as ServerResponse);
};

export default httpTrigger;
