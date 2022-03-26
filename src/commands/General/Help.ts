import { MessageType, Mimetype } from '@adiwajshing/baileys'
import { join } from 'path'
import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'help',
            description: 'Displays the help menu or shows the info of the command provided',
            category: 'general',
            usage: `${client.config.prefix}help (command_name)`,
            dm: true,
            aliases: ['h']
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        const n = [
            'https://user-images.githubusercontent.com/97864273/153344976-866e1e2b-9522-4f35-889d-31d83f11ade1.mp4'
        ]
        let well = n[Math.floor(Math.random() * n.length)]
        return void this.client.sendMessage(M.from, { url: well }, MessageType.video, {quoted:M.WAMessage,
            mimetype: Mimetype.gif,
            caption: `𝑴𝒐𝒔𝒉𝒊 𝑴𝒐𝒔𝒉𝒊✨, 𝒊'𝒎 𝑺𝒉𝒖𝒏𝒂🌸!

𝑴𝒚 𝒑𝒓𝒆𝒇𝒊𝒙 𝒊𝒔 ( / )

𝑻𝒉𝒆𝒔𝒆 𝒂𝒓𝒆 𝒕𝒉𝒆 𝒄𝒐𝒎𝒎𝒂𝒏𝒅𝒔 𝒚𝒐𝒖 𝒄𝒂𝒏 𝒖𝒔𝒆~

⑅───✷ 𝑪𝒐𝒅𝒊𝒏𝒈 ✷───⑅

✿ 𝑔𝑖𝑡ℎ𝑢𝑏

⑅───✷ 𝑬𝒅𝒖𝒄𝒂𝒕𝒊𝒗𝒆 ✷───⑅

✿ 𝑐𝑎𝑙𝑐𝑢𝑙𝑎𝑡𝑜𝑟              ✿ 𝑐𝑟𝑦𝑝𝑡𝑜
✿ 𝑒𝑙𝑒𝑚𝑒𝑛𝑡                 ✿ 𝑡𝑟𝑖𝑣𝑖𝑎
✿ 𝑢𝑟𝑏𝑎𝑛𝑑𝑖𝑐𝑡𝑖𝑜𝑛𝑎𝑟𝑦    ✿ 𝑤𝑒𝑎𝑡ℎ𝑒𝑟

⑅───✷ 𝑭𝒖𝒏 ✷───⑅

✿ 𝑓𝑎𝑐𝑡      ✿ 𝑗𝑎𝑖𝑙 
✿ 𝑗𝑜𝑘𝑒     ✿ 𝑞𝑢𝑜𝑡𝑒
✿ 𝑟𝑖𝑝       ✿ 𝑟𝑒𝑎𝑐𝑡
✿ 𝑠ℎ𝑖𝑝     ✿ 𝑡𝑟𝑎𝑠ℎ
✿ 𝑡𝑟𝑖𝑔𝑔𝑒𝑟  ✿ 𝑤𝑎𝑛𝑡𝑒𝑑
✿ 𝑤ℎ𝑦     ✿ 𝑐ℎ𝑎𝑡

⑅───✷ 𝑮𝒂𝒎𝒆𝒔 ✷───⑅

✿ 𝑐ℎ𝑒𝑠𝑠

⑅───✷ 𝑮𝒆𝒏𝒆𝒓𝒂𝒍 ✷───⑅

✿ 𝑎𝑑𝑚𝑖𝑛𝑠   ✿ 𝑒𝑥𝑝
✿ ℎ𝑒𝑙𝑝        ✿ ℎ𝑖
✿ 𝑖𝑛𝑓𝑜        ✿ 𝑖𝑛𝑣𝑖𝑡𝑒𝑙𝑖𝑛𝑘
✿ 𝑜𝑤𝑛𝑒𝑟     ✿ 𝑝𝑟𝑜𝑓𝑖𝑙𝑒
✿ 𝑟𝑎𝑛𝑘       ✿ 𝑙𝑒𝑎𝑑𝑒𝑟𝑏𝑜𝑎𝑟𝑑

⑅───✷ 𝑴𝒆𝒅𝒊𝒂 ✷───⑅

✿ 𝑘𝑎𝑟𝑎𝑜𝑘𝑒   ✿ 𝑙𝑦𝑟𝑖𝑐𝑠
✿ 𝑝𝑙𝑎𝑦         ✿ 𝑠𝑝𝑜𝑡𝑖𝑓𝑦
✿ 𝑦𝑡𝑎𝑢𝑑𝑖𝑜    ✿ 𝑦𝑡𝑠𝑒𝑎𝑟𝑐ℎ
✿ 𝑦𝑡𝑣𝑖𝑑𝑒𝑜

⑅───✷ 𝑴𝒐𝒅𝒆𝒓𝒂𝒕𝒊𝒐𝒏 ✷───⑅

✿ 𝑎𝑐𝑡𝑖𝑣𝑎𝑡𝑒   ✿ 𝑑𝑒𝑎𝑐𝑡𝑖𝑣𝑎𝑡𝑒
✿ 𝑐𝑙𝑜𝑠𝑒       ✿ 𝑑𝑒𝑙𝑒𝑡𝑒
✿ 𝑑𝑒𝑚𝑜𝑡𝑒    ✿ 𝑝𝑟𝑜𝑚𝑜𝑡𝑒
✿ 𝑝𝑢𝑟𝑔𝑒       ✿ 𝑟𝑒𝑚𝑜𝑣𝑒
✿ 𝑟𝑒𝑣𝑜𝑘𝑒

⑅───✷ 𝑼𝒕𝒊𝒍𝒔 ✷───⑅

✿ 𝑏𝑙𝑢𝑟        ✿ 𝑐𝑖𝑟𝑐𝑙𝑒
✿ 𝑔𝑒𝑡𝑔𝑖𝑓      ✿ 𝑔𝑜𝑜𝑔𝑙𝑒
✿ 𝑟𝑒𝑡𝑟𝑖𝑒𝑣𝑒   ✿ 𝑠𝑐𝑟𝑒𝑒𝑛𝑠ℎ𝑜𝑡
✿ 𝑠𝑡𝑒𝑎𝑙       ✿ 𝑠𝑡𝑖𝑐𝑘𝑒𝑟
✿ 𝑠𝑢𝑏𝑟𝑒𝑑    ✿ 𝑡𝑟𝑎𝑛𝑠𝑙𝑎𝑡𝑒
✿ 𝑤𝑖𝑘𝑖𝑝𝑒𝑑𝑖𝑎

⑅───✷ 𝑾𝒆𝒆𝒃 ✷───⑅

✿ 𝑎𝑛𝑖𝑚𝑒           ✿ 𝑎𝑛𝑖𝑚𝑒𝑞𝑢𝑜𝑡𝑒
✿ 𝑎𝑛𝑖𝑚𝑒𝑚𝑒      ✿ 𝑐ℎ𝑎𝑟𝑎𝑐𝑡𝑒𝑟
✿ 𝑐ℎ𝑎𝑟𝑎𝑐𝑡𝑒𝑟𝑖𝑑   ✿ 𝑔𝑒𝑛𝑠ℎ𝑖𝑛𝑐ℎ𝑎𝑟𝑎𝑐𝑡𝑒𝑟
✿ ℎ𝑎𝑖𝑔𝑢𝑠ℎ𝑎      ✿ 𝑚𝑎𝑛𝑔𝑎
✿ 𝑝𝑜𝑘𝑒𝑚𝑜𝑛      ✿ 𝑠𝑎𝑢𝑐𝑒
✿ 𝑤𝑎𝑙𝑙𝑝𝑎𝑝𝑒𝑟      ✿ 𝑣𝑡𝑢𝑏𝑒𝑟

⑅───✷ 𝑾𝒆𝒆𝒃 2 ✷───⑅

✿ 𝑎𝑛𝑖𝑚𝑒𝑝𝑎𝑝𝑒𝑟   ✿ 𝑘𝑖𝑡𝑠𝑢𝑛𝑒
✿ 𝑙𝑜𝑙𝑖                ✿ 𝑛𝑒𝑘𝑜
✿ 𝑤𝑎𝑖𝑓𝑢            ✿ 𝑟𝑝𝑎𝑝𝑒𝑟 

🎐𝑺𝒉𝒆 𝑰𝒔 𝑭𝒍𝒂𝒎𝒆 𝑰𝒏 𝑨𝒏𝒈𝒆𝒍 𝑺𝒌𝒊𝒏...` }
        )
    }
}
