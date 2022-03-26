import { MessageType } from '@adiwajshing/baileys'
import WAClient from '../lib/WAClient'

export default class CallHandler {
    constructor(public client: WAClient) {}

    rejectCall = async (caller: string, callID: string): Promise<void> => {
        const tag = this.client.generateMessageTag()
        const json = [
            'action',
            'call',
            [
                'call',
                {
                    from: this.client.user.jid,
                    to: caller,
                    id: tag
                },
                [
                    [
                        'reject',
                        {
                            'call-id': callID,
                            'call-creator': caller,
                            count: '0'
                        },
                        null
                    ]
                ]
            ]
        ]

        await this.client.sendWA(`${tag},${JSON.stringify(json)}`)
        await this.client.sendMessage(
					caller,
					`𝐘𝐨𝐮'𝐥𝐥 𝐛𝐞 𝐛𝐚𝐧𝐧𝐞𝐝 𝐟𝐨𝐫 𝐜𝐚𝐥𝐥𝐢𝐧𝐠 𝐭𝐡𝐞 𝐛𝐨𝐭, 𝐁𝐚𝐤𝐚!`,
					MessageType.text
				);
				await this.client.blockUser(caller);
				await this.client.banUser(caller);
    }
}
