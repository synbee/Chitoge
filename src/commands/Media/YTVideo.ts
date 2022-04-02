import { MessageType } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import YT from "../../lib/YT";
import { ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
  constructor(client: WAClient, handler: MessageHandler) {
    super(client, handler, {
      command: "ytvideo",
      description: "Downloads given YT Video",
      category: "media",
      aliases: ["ytv"],
      usage: `${client.config.prefix}ytv [URL]`,
      baseXp: 10,
    });
  }

  run = async (M: ISimplifiedMessage): Promise<void> => {
    if (!M.urls.length)
      return void M.reply(
        "🔎 𝑃𝑟𝑜𝑣𝑖𝑑𝑒 𝑡ℎ𝑒 𝑈𝑅𝐿 𝑜𝑓 𝑡ℎ𝑒 𝑌𝑇 𝑣𝑖𝑑𝑒𝑜 𝑦𝑜𝑢 𝑤𝑎𝑛𝑡 𝑡𝑜 𝑑𝑜𝑤𝑛𝑙𝑜𝑎𝑑"
      );
    const video = new YT(M.urls[0], "video");
    if (!video.validateURL()) return void M.reply(`Provide a Valid YT URL`);
    const { videoDetails } = await video.getInfo();
    if (Number(videoDetails.lengthSeconds) > 1800)
      return void M.reply("⚓ 𝐶𝑎𝑛𝑛𝑜𝑡 𝑑𝑜𝑤𝑛𝑙𝑜𝑎𝑑 𝑣𝑖𝑑𝑒𝑜𝑠 𝑙𝑜𝑛𝑔𝑒𝑟 𝑡ℎ𝑎𝑛 30 𝑚𝑖𝑛𝑢𝑡𝑒𝑠");
    M.reply(await video.getBuffer(), MessageType.video).catch((reason: Error) =>
      M.reply(`𝐀𝐧 𝐞𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐫𝐞𝐝, 𝐑𝐞𝐚𝐬𝐨𝐧: ${reason}`)
    );
  };
}
