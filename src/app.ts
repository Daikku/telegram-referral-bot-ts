import { Telegraf} from "telegraf";
import { config } from "./config";
import { connectToDatabase } from "./database";
import { User } from "./models/user";
import { startCommand } from "./controllers/start";

const bot = new Telegraf(config.botToken as string);

bot.start(startCommand);

connectToDatabase().then((): void =>{
    bot.launch()
    console.log('Bot is running')
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
