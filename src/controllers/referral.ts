import { Context } from 'telegraf';
import { User } from '../models/user';

export const referralLinkCommand = async (ctx: Context): Promise<void> => {
    const telegramId = ctx.from?.id as number;
    const user = await User.findOne({ telegramId }).lean();
    if (user) {
        await ctx.reply(`Ваша реферальная ссылка: ${user.referralLink}`);
    }
};

export const sendReferralMessage = async (telegramId: number, referredBy: number, ctx: Context): Promise<void> => {
    await User.updateOne({ telegramId: referredBy },
        {
            $addToSet: { directReferrals: telegramId },
            $inc: {balance: 10}
        });

    const referrer = await User.findOne({telegramId: referredBy}).lean();
    await ctx.reply(`Добро пожаловать! Вас пригласил ${ referrer?.telegramId }`)
    await ctx.telegram.sendMessage(
        referredBy,
        `Новый пользователь ${ctx.from?.first_name} присоединился`
    )
};