const { infinityy } = require("../framework/infinityy");
const axios = require("axios");

infinityy({ nomCom: "videostyle", categorie: "Search", reaction: "✋" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  const text = arg.join(" ");

  if (!text) {
    return repondre("Please provide a search query.");
  }

  try {
    const messageText = `Reply with a number to generate *${text}* logo:

1. Sweet love 💕😘
2. Lightning PUBG ⚡
3. Intro video 📷
4. Tiger 🐯 logo

Enjoy 😂🔪`;

    const contextInfo = {
      mentionedJid: [ms.sender],
      externalAdReply: {
        title: "INFINITY-MD",
        body: "Powered by SIRIUS",
        thumbnailUrl: "https://files.catbox.moe/387f85.jpg", // image que tu as envoyée
        sourceUrl: "https://whatsapp.com/channel/0029Van0rwb5Ejy2o769hi0J", // lien de ta chaîne
        mediaType: 1,
        renderLargerThumbnail: true
      }
    };

    const sentMsg = await zk.sendMessage(dest, {
      text: messageText,
      contextInfo
    }, { quoted: ms });

    zk.ev.on("messages.upsert", async (update) => {
      const msg = update.messages[0];
      if (!msg.message || !msg.message.extendedTextMessage) return;

      const replyText = msg.message.extendedTextMessage.text.trim();
      const stanzaId = msg.message.extendedTextMessage.contextInfo?.stanzaId;

      if (stanzaId !== sentMsg.key.id) return;

      let logoUrl;
      switch (replyText) {
        case "1":
          logoUrl = await fetchLogo("https://en.ephoto360.com/create-sweet-love-video-cards-online-734.html", text);
          break;
        case "2":
          logoUrl = await fetchLogo("https://en.ephoto360.com/lightning-pubg-video-logo-maker-online-615.html", text);
          break;
        case "3":
          logoUrl = await fetchLogo("https://en.ephoto360.com/free-logo-intro-video-maker-online-558.html", text);
          break;
        case "4":
          logoUrl = await fetchLogo("https://en.ephoto360.com/create-digital-tiger-logo-video-effect-723.html", text);
          break;
        default:
          return repondre("*_Invalid number. Please reply with a valid option._*");
      }

      if (logoUrl) {
        await zk.sendMessage(dest, {
          video: { url: logoUrl },
          mimetype: "video/mp4",
          caption: `🎬 *Downloaded by INFINITY-MD*`
        }, { quoted: ms });
      } else {
        repondre("❌ Failed to fetch video link.");
      }
    });
  } catch (err) {
    console.error("Error:", err);
    repondre("An error occurred while processing your request.");
  }
});

// Function to fetch logo video
async function fetchLogo(url, name) {
  try {
    const res = await axios.get("https://api-pink-venom.vercel.app/api/logo", {
      params: { url, name }
    });
    return res.data?.result?.download_url || null;
  } catch (e) {
    console.error("Fetch logo failed:", e);
    return null;
  }
}
