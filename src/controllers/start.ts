import { Context } from 'telegraf';
import { User } from "../models/user";

interface MyContext extends Context {
    payload?: string;
}

export const startCommand = async (ctx: MyContext) => {
    if (ctx.from){
        const telegramId = ctx.from.id as number;
        const referredBy = ctx.payload;

        let user = await User.findOne({ telegramId });
        if (!user) {
            user = new User({
                telegramId: telegramId,
                referralLink: `https://t.me/${ctx.botInfo.username}?start=${telegramId}`,
                referredBy: referredBy
            });
            await user.save();
        }

        await ctx.reply(`Добро пожаловать! Ваша реферальная ссылка: ${user.referralLink}`);
    }
}