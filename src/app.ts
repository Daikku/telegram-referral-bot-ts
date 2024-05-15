import { Telegraf } from "telegraf";
import { config } from "./config";
import { connectToDatabase } from "./database";

const bot = new Telegraf(config.botToken as string)

bot.start((ctx): void => {
    ctx.reply('Hello!')
})

connectToDatabase().then(() =>{
    bot.launch()
    console.log('Bot is running')
})

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
