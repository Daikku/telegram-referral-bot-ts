import { Context } from 'telegraf';
import { User, IUser } from "../models/user";
import { sendReferralMessage } from "./referral";
import { checkSubscription } from "./subscription";

interface MyContext extends Context {
    payload?: string;
}

export const startCommand = async (ctx: MyContext): Promise<void> => {
    if (ctx.from){
        const telegramId = ctx.from.id as number;
        const referredBy = Number(ctx.payload) || null;

        let user: IUser | null = await User.findOne({ telegramId }).lean<IUser>();

        if (!user) {
            await User.create({
                telegramId: telegramId,
                referralLink: `https://t.me/${ctx.botInfo.username}?start=${telegramId}`,
                referredBy: referredBy
            });
        }

        if (referredBy !== telegramId && referredBy !== null) {
            await sendReferralMessage(telegramId, referredBy, ctx)
        }

        await checkSubscription(ctx);


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