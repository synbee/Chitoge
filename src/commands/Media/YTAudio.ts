import { MessageType } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import YT from "../../lib/YT";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "ytaudio",
      description: "Downloads given YT Video and sends it as Audio",
      category: "media",
      aliases: ["yta"],
      usage: `${client.config.prefix}ytv [URL]`,
      baseXp: 20,
    });
  }

  run = async (M: ISimplifiedMessage): Promise<void> => {
    if (!M.urls.length)
      return void M.reply(
        "🔎 𝑃𝑟𝑜𝑣𝑖𝑑𝑒 𝑡ℎ𝑒 𝑈𝑅𝐿 𝑜𝑓 𝑡ℎ𝑒 𝑌𝑇 𝑣𝑖𝑑𝑒𝑜 𝑦𝑜𝑢 𝑤𝑎𝑛𝑡 𝑡𝑜 𝑑𝑜𝑤𝑛𝑙𝑜𝑎𝑑"
      );
    const audio = new YT(M.urls[0], "audio");
    if (!audio.validateURL()) return void M.reply(`⚓ 𝑃𝑟𝑜𝑣𝑖𝑑𝑒 𝑎 𝑣𝑎𝑙𝑖𝑑 𝑌𝑇 𝑈𝑅𝐿`);
    M.reply(await audio.getBuffer(), MessageType.audio).catch((reason: Error) =>
      M.reply(`𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐫𝐞𝐝, 𝐑𝐞𝐚𝐬𝐨𝐧: ${reason}`)
    );
  };
}
