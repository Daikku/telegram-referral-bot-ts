import { Context } from 'telegraf';
import { User } from '../models/user';

export const referralCommand = async (ctx: Context): Promise<void> => {
    const telegramId = ctx.from?.id as number;
    const user = await User.findOne({ telegramId });
    if (user) {
        await ctx.reply(`Ваша реферальная ссылка: ${user.referralLink}`);
    }
};