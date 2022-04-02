import { MessageType } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";
import yts from "yt-search";
import YT from "../../lib/YT";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "play",
      description: "🎵 play a song with just search term!",
      category: "media",
      aliases: ["music"],
      usage: `${client.config.prefix}play [term]`,
      baseXp: 30,
    });
  }

  run = async (
    M: ISimplifiedMessage,
    { joined }: IParsedArgs
  ): Promise<void> => {
    if (!joined) return void M.reply(" 𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐬𝐞𝐚𝐫𝐜𝐡 𝐭𝐞𝐫𝐦 𝐩𝐥𝐞𝐚𝐬𝐞!");
    const term = joined.trim();
    const { videos } = await yts(term);
    if (!videos || videos.length <= 0)
      return void M.reply(
        `𝐍𝐨 𝐌𝐚𝐭𝐜𝐡𝐢𝐧𝐠 𝐯𝐢𝐝𝐞𝐨𝐬 𝐟𝐨𝐮𝐧𝐝 𝐟𝐨𝐫 𝐭𝐡𝐞 𝐭𝐞𝐫𝐦 : *${term}*`
      );
    const audio = new YT(videos[0].url, "audio");
    if (!audio.url) return;
    this.client
      .sendMessage(M.from, await audio.getBuffer(), MessageType.audio, {
        quoted: M.WAMessage,
        contextInfo: {
          externalAdReply: {
            title: videos[0].title.substr(0, 30),
            body: `𝐀𝐮𝐭𝐡𝐨𝐫 : ${videos[0].author.name.substr(
              0,
              20
            )}\n🌺 𝐒𝐇𝐔𝐍𝐀 🌺`,
            mediaType: 2,
            thumbnail: await this.client.getBuffer(
              `https://i.ytimg.com/vi/${audio.id}/hqdefault.jpg`
            ),
            mediaUrl: audio.url,
          },
        },
      })
      .catch((reason: Error) =>
        M.reply(`𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐫𝐞𝐝. 𝐏𝐥𝐞𝐚𝐬𝐞 𝐭𝐫𝐲 𝐚𝐠𝐚𝐢𝐧 𝐥𝐚𝐭𝐞𝐫.`)
      );
  };
}
