
const { infinityy } = require("../framework/infinityy");

const runtime = function (seconds) {
  seconds = Number(seconds);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor(seconds % 86400 / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  const secs = Math.floor(seconds % 60);
  const d = days > 0 ? `${days}${days === 1 ? " day, " : " d, "}` : '';
  const h = hours > 0 ? `${hours}${hours === 1 ? " hour, " : " h, "}` : '';
  const m = minutes > 0 ? `${minutes}${minutes === 1 ? " minute, " : " m, "}` : '';
  const s = secs > 0 ? `${secs}${secs === 1 ? " second" : " s"}` : '';
  return d + h + m + s;
};

infinityy({
  nomCom: "uptime",
  desc: "To check how long the bot is running",
  Categorie: "General",
  reaction: "🕖",
  fromMe: "true"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre } = commandeOptions;

  const caption = `
╭━━━〔 𝙐𝙋𝙏𝙄𝙈𝙀 - 𝙎𝙏𝘼𝙏𝙐𝙎 〕━━⬣
┃ 🔄 *Bot en ligne depuis :*
┃ ⏱️ *${runtime(process.uptime())}*
╰━━━━━━━━━━━━━━━━━━━━⬣

> 𝙥𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 𝙎𝙄𝙍𝙄𝙐𝙎
`;

  try {
    // 🎵 Envoi du voice note
    await zk.sendMessage(dest, {
      audio: { url: "https://files.catbox.moe/479nwt.mp3" },
      mimetype: "audio/mp4",
      ptt: true,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363328294650605@newsletter",
          newsletterName: "𝐈𝐍𝐅𝐈𝐍𝐈𝐓𝐘-𝐌𝐃",
          serverMessageId: 143
        }
      }
    }, { quoted: ms });

    // 🖼️ Envoi de l’image avec preview enrichi
    await zk.sendMessage(dest, {
      image: { url: "https://files.catbox.moe/oakbgh.jpg" },
      caption: caption,
      footer: "✨ INFINITY-MD ✨",
      contextInfo: {
        externalAdReply: {
          title: "Bot Runtime",
          body: `Uptime: ${runtime(process.uptime())}`,
          thumbnailUrl: "https://files.catbox.moe/oakbgh.jpg",
          mediaType: 1,
          renderLargerThumbnail: true,
          sourceUrl: "",
        },
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363328294650605@newsletter",
          newsletterName: "𝐈𝐍𝐅𝐈𝐍𝐈𝐓𝐘-𝐌𝐃",
          serverMessageId: 143
        }
      }
    }, { quoted: ms });

  } catch (e) {
    console.log("❌ Uptime Command Error: " + e);
    repondre("❌ Erreur : " + e);
  }
});
