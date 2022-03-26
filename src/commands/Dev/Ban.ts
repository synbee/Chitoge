import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'ban',
            description: 'Bans the tagged users globally',
            category: 'dev',
            usage: `${client.config.prefix}ban [@tag]`,
            modsOnly: true,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        const immortals = this.client.config.mods
            ? [M.sender.jid, this.client.user.jid, ...this.client.config.mods]
            : [M.sender.jid, this.client.user.jid]

        if (M.quoted?.sender) M.mentioned.push(M.quoted.sender)
        if (!M.mentioned.length || !M.mentioned[0]) return void M.reply('𝑀𝑒𝑛𝑡𝑖𝑜𝑛 𝑡ℎ𝑒 𝑢𝑠𝑒𝑟 𝑤ℎ𝑜𝑚 𝑦𝑜𝑢 𝑤𝑎𝑛𝑡 𝑡𝑜 𝑏𝑎𝑛')
        let text = '*𝐒𝐓𝐀𝐓𝐄*\n\n'
        // declare tagged as (string | undefined) []
        // const tagged : (string | undefined)[] = []
        for (const user of M.mentioned) {
            if (immortals.includes(user)) {
                // tagged.push(user)
                text += `✴️ @${user.split('@')[0]} 𝒊𝒔 𝒂 𝒈𝒐𝒅, 𝒄𝒂𝒏'𝒕 𝒃𝒆 𝒃𝒂𝒏𝒏𝒆𝒅\n`
                continue
            }
            const data = await this.client.getUser(user)
            // const info = this.client.getContact(user)
            // const username = info.notify || info.vname || info.name || user.split('@')[0]
            // const username = user.split('@')[0]
            if (data?.ban) {
                text += `🔶 @${user.split('@')[0]}: 𝑨𝒍𝒓𝒆𝒂𝒅𝒚 𝑩𝒂𝒏𝒏𝒆𝒅\n`
                continue
            }
            await this.client.blockUser(user);
            await this.client.banUser(user)
            text += `♦️ @${user.split('@')[0]}: 𝑩𝒂𝒏𝒏𝒆𝒅\n`
        }
        await M.reply(
            `${text}`,
            undefined,
            undefined,
            // undefined
            [...M.mentioned, M.sender.jid]
        )
    }
}
