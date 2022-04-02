import { MessageType } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import request from '../../lib/request'
import Spotify from '../../lib/Spotify'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'spotify',
            description: 'Downloads given spotify track and sends it as Audio',
            category: 'media',
            usage: `${client.config.prefix}spotify [URL]`,
            baseXp: 20,
            aliases: ['sp']
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (!M.urls.length) return void M.reply(`𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐭𝐡𝐞 𝐒𝐩𝐨𝐭𝐢𝐟𝐲 𝐓𝐫𝐚𝐜𝐤 𝐔𝐑𝐋 𝐭𝐡𝐚𝐭 𝐲𝐨𝐮 𝐰𝐚𝐧𝐭 𝐭𝐨 𝐝𝐨𝐰𝐧𝐥𝐨𝐚𝐝`)
        const url = M.urls[0]
        const track = new Spotify(url)
        const info = await track.getInfo()
        if (info.error) return void M.reply(`𝐄𝐫𝐫𝐨𝐫 𝐅𝐞𝐭𝐜𝐡𝐢𝐧𝐠: ${url}. 𝐂𝐡𝐞𝐜𝐤 𝐢𝐟 𝐭𝐡𝐞 𝐮𝐫𝐥 𝐢𝐬 𝐯𝐚𝐥𝐢𝐝 𝐚𝐧𝐝 𝐭𝐫𝐲 𝐚𝐠𝐚𝐢𝐧`)
        const caption = `🎧 𝐒𝐨𝐧𝐠 𝐧𝐚𝐦𝐞: ${info.name || ''}\n🎤 𝐀𝐫𝐭𝐢𝐬𝐭𝐬: ${(info.artists || []).join(',')}\n💽 𝐀𝐥𝐛𝐮𝐦: ${
            info.album_name
        }\n📆 𝐑𝐞𝐥𝐞𝐚𝐬𝐞 𝐃𝐚𝐭𝐞: ${info.release_date || ''}`
        M.reply(
            await request.buffer(info?.cover_url as string),
            MessageType.image,
            undefined,
            undefined,
            caption
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ).catch((reason: any) => M.reply(`𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐫𝐞𝐝, 𝐑𝐞𝐚𝐬𝐨𝐧: ${reason}`))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        M.reply(await track.getAudio(), MessageType.audio).catch((reason: any) =>
            M.reply(`𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐫𝐞𝐝, 𝐑𝐞𝐚𝐬𝐨𝐧: ${reason}`)
        )
    }
}
