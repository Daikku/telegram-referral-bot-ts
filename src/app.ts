import { Telegraf } from "telegraf";
import { config } from "./config";

const bot = new Telegraf(config.botToken as string)

bot.start((ctx) => {
    ctx.reply('Hello!')
})

bot.launch()
console.log('Bot is running')

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
