const util = require('util');
const fs = require('fs-extra');
const { infinityy } = require(__dirname + "/../framework/infinityy");
const os = require("os");
const moment = require("moment-timezone");
const conf = require(__dirname + "/../set");

moment.tz.setDefault(`${conf.TZ}`);

const AUDIO_URL = "https://files.catbox.moe/479nwt.mp3";
const THUMBNAIL_URL = "https://files.catbox.moe/oakbgh.jpg";
const SOURCE_URL = "https://github.com/HAITIAN0967/INFINITY-MD"; // Lien par défaut

const getTimeAndDate = () => {
    return {
        time: moment().format('HH:mm:ss'),
        date: moment().format('DD/MM/YYYY')
    };
};

// Ping Command
infinityy({ nomCom: "ping", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre } = commandeOptions;
    const { time, date } = getTimeAndDate();
    const ping = Math.floor(Math.random() * 1000) + 1;

    const stylizedCaption = `
╭━━━〔 𝙋𝙄𝙉𝙂 - 𝙎𝙏𝘼𝙏𝙐𝙎 〕━━⬣
┃ ✅ *INFINITY-MD is alive!*
┃ 📶 *Ping* : *${ping}ms*
┃ 📅 *Date* : *${date}*
┃ ⏰ *Heure* : *${time}*
┃ 💻 *Système* : *${os.platform()}*
┃ 📊 *RAM* : *${(os.freemem() / 1024 / 1024).toFixed(2)} MB libre*
╰━━━━━━━━━━━━━━━━━━━━⬣

> 𝙥𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 𝙎𝙄𝙍𝙄𝙐𝙎
`;

    try {
        // Envoie la musique comme note vocale
        await zk.sendMessage(dest, {
            audio: { url: AUDIO_URL },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: ms });

        // Envoie le message stylisé avec image
        await zk.sendMessage(dest, {
            image: { url: THUMBNAIL_URL },
            caption: stylizedCaption,
            footer: "✨ INFINITY-MD ✨",
            contextInfo: {
                externalAdReply: {
                    title: "INFINITY SYSTEM ONLINE",
                    body: "Ping opérationnel",
                    thumbnailUrl: THUMBNAIL_URL,
                    mediaType: 1,
                    sourceUrl: SOURCE_URL
                }
            }
        }, { quoted: ms });

    } catch (e) {
        console.log("❌ Ping Command Error: " + e);
        repondre("❌ Error: " + e);
    }
});
