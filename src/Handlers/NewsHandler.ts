import { MessageType } from "@adiwajshing/baileys";
import { getNewsNoDetails } from "mal-scraper";
import WAClient from "../lib/WAClient";
import cron from "node-cron";

export default class NewsHandler {
  constructor(public client: WAClient) {}

  broadcastNews = async (): Promise<void> => {
    cron.schedule("*/15 * * * *", async () => {
      const news: any = await getNewsNoDetails(20);
      const data = await await this.client.getFeatures("news");
      if (data.id === news[0].newsNumber) return void null;
      for (let i = 0; i < data.jids.length; i++) {
        const text = `ꕥ━━━━━❰ 𝐉𝐔𝐒𝐓 𝐈𝐍 ❱━━━━━━ꕥ\n\n\t\t\t\t\t\t\t🌺 𝐍𝐞𝐰𝐬 🌺\n\n🌼 𝐓𝐢𝐭𝐥𝐞: ${news[0].title}\n\n❄ 𝐒𝐡𝐨𝐫𝐭 𝐃𝐞𝐭𝐚𝐢𝐥𝐬: ${news[0].text}\n\n🌸 𝐔𝐑𝐋: ${news[0].link}`;
        const image = await this.client.getBuffer(news[0].image);
        await this.client.sendMessage(data.jids[i], image, MessageType.image, {
          caption: text,
          contextInfo: {
            externalAdReply: {
              title: news[0].title,
              body: news[0].text,
              thumbnail: image,
              sourceUrl: news[0].link,
            },
          },
        });
        setTimeout(async () => {
          await this.client.DB.feature.updateOne(
            { feature: "news" },
            { $set: { id: news[0].newsNumber } }
          );
        }, 300000);
      }
    });
  };
}
