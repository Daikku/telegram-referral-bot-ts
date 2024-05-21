import { Context } from 'telegraf';
import { User } from "../models/user";

interface MyContext extends Context {
    payload?: string;
}

export const startCommand = async (ctx: MyContext): Promise<void> => {
    if (ctx.from){
        const telegramId = ctx.from.id as number;
        const referredBy = Number(ctx.payload) || null;

        let user = await User.findOne({ telegramId });
        if (!user) {
            user = new User({
                telegramId: telegramId,
                referralLink: `https://t.me/${ ctx.botInfo.username }?start=${ telegramId }`,
                referredBy: referredBy
            });
            await user.save();
        }

        if (referredBy) {
            await User.updateOne({ telegramId: referredBy },
                { $addToSet: { directReferrals: telegramId },
                         $inc: {balance: 10}
                });

            const referrer = await User.findOne({telegramId: referredBy});
            await ctx.reply(`Добро пожаловать! Вас пригласил ${ referrer?.telegramId }`)
            await ctx.telegram.sendMessage(
                referredBy,
                `Новый пользователь ${ctx.from.first_name} присоединился`
            )
        }

        await ctx.reply(`Добро пожаловать!`, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Моя реферальная ссылка', callback_data: 'referral_link' }],
                    [{ text: 'Мой баланс', callback_data: 'balance' }],
                    [{ text: 'Посмотреть рефералов', callback_data: 'referrals' }],
                    [{ text: 'Сменить язык', callback_data: 'language' }]
                ]
            }
        });
    }
}