const util = require('util');
const fs = require('fs-extra');
const { infinityy } = require(__dirname + "/../framework/infinityy");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const Taphere = more.repeat(4001);

infinityy({ nomCom: "biblelist", categorie: "God-first" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/infinityy");
    var coms = {};
    var mode = s.MODE.toLowerCase() === "yes" ? "public" : "private";

    cm.map((com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault("America/Port-au-Prince");

    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `🤲🕍 ┈─• *HOLY BIBLE* •─┈ 🕍🤲

💫 𝘈𝘭𝘭 Holy books 𝘢𝘯𝘥 𝘵𝘩𝘦𝘪𝘳 𝘯𝘶𝘮𝘣𝘦𝘳𝘴 𝘭𝘪𝘴𝘵
𝘍𝘰𝘳 𝘨𝘦𝘵𝘵𝘪𝘯𝘨 𝘢 𝘷𝘦𝘳𝘴𝘦, 𝘵𝘺𝘱𝘦: *${prefixe}bible judges 2:3*

📅 *Date:* ${date}
⏰ *Time:* ${temps}
👤 *User:* ${nomAuteurMessage || "Unknown"}
🌍 *Mode:* ${mode}
🧩 *Prefix:* ${prefixe}
🖥️ *System:* ${os.platform()}
📊 *RAM:* ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB
👑 *Owner:* SIRIUS

${Taphere}

📜 *Old Testament* :
1. 🧬 Genesis (MWANZO)
2. ♟️ Exodus (KUTOKA)
3. 🕴️ Leviticus (WALAWI)
...
39. 🌄 Malachi (MALAKI)

📖 *New Testament* :
1. 🌈 Matthew (MATHAYO)
2. ☔ Mark (MARKO)
3. 💧 Luke (LUKA)
...
27. 🌌 Revelation (UFUNUO WA YOHANA)

🎮 *BY SIRIUS TECH*
`;

    let footerMsg = `> *POWERED BY INFINITY-MD*\n\n📢 Newsletter: *𝐈𝐍𝐅𝐈𝐍𝐈𝐓𝐘-𝐌𝐃*\n🔗 https://whatsapp.com/channel/0029Van0rwb5Ejy2o769hi0J`;

    try {
        await zk.sendMessage(dest, {
            text: infoMsg + "\n" + footerMsg,
            contextInfo: {
                mentionedJid: [ms.key.participant || nomAuteurMessage],
                externalAdReply: {
                    title: "📖 INFINITY-MD HOLY BIBLE",
                    body: "Live with God — You don't know your tomorrow",
                    thumbnailUrl: "https://files.catbox.moe/rmi418.jpg",
                    sourceUrl: "https://whatsapp.com/channel/0029Van0rwb5Ejy2o769hi0J",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (error) {
        console.error("📛 Menu Error: ", error);
        repondre("🥵 Menu Error: " + error);
    }
});
