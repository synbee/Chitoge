import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            adminOnly: true,
            aliases: ['boom'],
            command: 'remove',
            description: 'removes the mentioned users',
            category: 'moderation',
            usage: `${client.config.prefix}remove [@mention | tag]`,
            baseXp: 10
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        let text = '*Action*\n\n'
        if (!M.groupMetadata?.admins?.includes(this.client.user.jid))
            return void M.reply(`𝐻𝑜𝑤 𝑐𝑎𝑛 𝐼 𝑟𝑒𝑚𝑜𝑣𝑒 𝑠𝑜𝑚𝑒𝑜𝑛𝑒 𝑤𝑖𝑡ℎ𝑜𝑢𝑡 𝑏𝑒𝑖𝑛𝑔 𝑎𝑛 𝑎𝑑𝑚𝑖𝑛?`)
        if (M.quoted?.sender) M.mentioned.push(M.quoted.sender)
        if (!M.mentioned.length) return void M.reply(`𝑇𝑎𝑔 𝑡ℎ𝑒 𝑢𝑠𝑒𝑟𝑠 𝑦𝑜𝑢 𝑤𝑎𝑛𝑡 𝑡𝑜 ${this.config.command}`)
        M.mentioned.forEach(async (user) => {
            // const usr = this.client.contacts[user]
            // const username = usr.notify || usr.vname || usr.name || user.split('@')[0]
            if (M.groupMetadata?.owner.split('@')[0] === user.split('@')[0]) {
                text += `✖ 𝑆𝑘𝑖𝑝𝑝𝑒𝑑 *@${user.split('@')[0]}* 𝑎𝑠 𝑡ℎ𝑒𝑦'𝑟𝑒 𝑜𝑤𝑛𝑒𝑟.\n`
            }
            // check if user is Bot
            else if (this.client.user.jid === user) {
                text += `✖ 𝑆𝑘𝑖𝑝𝑝𝑒𝑑 *@${user.split('@')[0]}* 𝑐𝑜𝑧 𝑡ℎ𝑎𝑡'𝑠 𝑚𝑒!.\n`
            } else {
                text += `🟥 𝐑𝐞𝐦𝐨𝐯𝐞𝐝 *@${user.split('@')[0]}*\n`
                await this.client.groupRemove(M.from, [user])
            }
        })
        await M.reply(`${text}`, undefined, undefined, [...M.mentioned, M.sender.jid])
    }
}
