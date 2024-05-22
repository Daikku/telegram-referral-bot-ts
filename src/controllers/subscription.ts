import {Context, Markup} from 'telegraf';

const CHANNEL_USERNAME = 'testchannel223344';

export const checkSubscription = async (ctx: Context): Promise<void> => {
    const chatInfo = await ctx.telegram.getChat(`@${CHANNEL_USERNAME}`);
    const chatId: number = chatInfo.id;

    const isMember = await ctx.telegram.getChatMember(
        chatId,
        ctx.from?.id as number
    );

    if (isMember.status === "left") {
        const joinChannelMarkup = Markup.inlineKeyboard([
            Markup.button.url("TORG_CIS", `https://t.me/${CHANNEL_USERNAME}`),
        ]);

        await ctx.reply("Подпишись на эти каналы", joinChannelMarkup)
    }
}


