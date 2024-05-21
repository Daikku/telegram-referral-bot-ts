import { Telegraf} from "telegraf";
import { config } from "./config";
import { connectToDatabase } from "./database";
import { startCommand } from "./controllers/start";
import { referralCommand } from "./controllers/referral";

const bot = new Telegraf(config.botToken as string);

bot.start(startCommand);
bot.action('referral_link', referralCommand);

connectToDatabase().then((): void =>{
    bot.launch()
    console.log('Bot is running')
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
