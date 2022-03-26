import { MessageType } from '@adiwajshing/baileys'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import request from '../../lib/request'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'profile',
            description: 'Displays user-profile 📜',
            category: 'general',
            usage: `${client.config.prefix}profile [tag/quote]`,
            aliases: ['p', 'pf'],
            baseXp: 30
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        if (M.quoted?.sender) M.mentioned.push(M.quoted.sender)
        const user = M.mentioned[0] ? M.mentioned[0] : M.sender.jid
        let username = user === M.sender.jid ? M.sender.username : "";
				if (!username) {
					const contact = this.client.getContact(user);
					username =
						contact.notify ||
						contact.vname ||
						contact.name ||
						user.split("@")[0];
				}
        let pfp: string
        try {
            pfp = await this.client.getProfilePicture(user)
        } catch (err) {
            M.reply(`𝑷𝒓𝒐𝒇𝒊𝒍𝒆 𝑷𝒊𝒄𝒕𝒖𝒓𝒆 𝒏𝒐𝒕 𝑨𝒄𝒄𝒆𝒔𝒔𝒊𝒃𝒍𝒆 𝒐𝒇 ${username}`)
            pfp =
                'https://www.linkpicture.com/q/1646053747862.jpg'
        }
        const exp = (await this.client.getUser(user)).Xp
        let role: string;
				if (exp < 500) {
					role = "🌸 Citizen";
				} else if (exp < 1000) {
					role = "🔎 Cleric";
				} else if (exp < 2000) {
					role = "🔮 Wizard";
				} else if (exp < 5000) {
					role = "♦️ Mage";
				} else if (exp < 10000) {
					role = "🎯 Noble";
				} else if (exp < 25000) {
					role = "✨ Elite";
				} else if (exp < 50000) {
					role = "🔶️ Ace";
				} else if (exp < 75000) {
					role = "🌀 Hero";
				} else if (exp < 100000) {
					role = "💎 Supreme";
				} else {
					role = "❄️ Mystic";
				}

				let level: number;
				if (exp < 500) {
					level = 1;
				} else if (exp < 1000) {
					level = 2;
				} else if (exp < 2000) {
					level = 3;
				} else if (exp < 5000) {
					level = 4;
				} else if (exp < 10000) {
					level = 5;
				} else if (exp < 25000) {
					level = 6;
				} else if (exp < 50000) {
					level = 7;
				} else if (exp < 75000) {
					level = 8;
				} else if (exp < 100000) {
					level = 9;
				} else {
					level = 10;
				}
        await M.reply(
            await request.buffer(
                pfp ||
                    'https://www.linkpicture.com/q/1646053747862.jpg'
            ),
            MessageType.image,
            undefined,
            undefined,
            `🦄 𝐔𝐬𝐞𝐫𝐧𝐚𝐦𝐞: ${username}\n\n🍹 𝐀𝐛𝐨𝐮𝐭: ${
                (await this.client.getStatus(user)).status || 'None'
            }\n\n🔖 𝐋𝐞𝐯𝐞𝐥: ${level}\n\n🍥 𝐄𝐱𝐩: ${exp || 0}\n\n💮 𝐑𝐨𝐥𝐞: ${role}\n\n🎖️ 𝐀𝐝𝐦𝐢𝐧: ${
                M.groupMetadata?.admins?.includes(user) || false
            }\n\n🟣 𝐁𝐚𝐧: ${(await this.client.getUser(user)).ban || false}`
        )
    }
}
