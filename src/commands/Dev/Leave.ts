import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'leave',
            description: 'Bot Leaves the group',
            category: 'dev',
            dm: true,
            usage: `${client.config.prefix}leave`,
            modsOnly: true,
            baseXp: 0
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        await M.reply(`𝐁𝐲𝐞 𝐁𝐲𝐞 👋`)
        await this.client.groupLeave(M.from).catch(() => M.reply('𝑭𝒂𝒊𝒍𝒆𝒅 𝒕𝒐 𝒍𝒆𝒂𝒗𝒆 𝒕𝒉𝒆 𝑮𝒓𝒐𝒖𝒑!'))
    }
}
