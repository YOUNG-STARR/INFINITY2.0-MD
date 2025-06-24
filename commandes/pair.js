
const {
  infinityy
} = require('../framework/infinityy');
const axios = require('axios');
infinityy({
  nomCom: "pair",
  aliases: ["session", "code", "paircode", "qrcode"],
  reaction: '☘️',
  categorie: 'system'
}, async (dest, zk, commandeOptions) => {
  const {
    repondre,
    arg,
    ms
  } = commandeOptions;
  if (!arg || arg.length === 0) {
    return repondre("Example Usage: .code  5093910xxxx.");
  }
  try {
    // Notify user that pairing is in progress

    await repondre(" *INFINITY-MD  is generating your pairing code ✅...* ");

    // Prepare the API request
    const encodedNumber = encodeURIComponent(arg.join(" "));
    // Fetch the pairing code from the API
    const response = await axios.get(`https://charle-ke-pair.onrender.com?number=${encodedNumber}`);
    const data = response.data;
    if (data && data.code) {
      const pairingCode = data.code;
      await zk.sendMessage(dest, {
        text: pairingCode,
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363328294650605@newsletter',
            newsletterName: "𝐈𝐍𝐅𝐈𝐍𝐈𝐓𝐘-𝐌𝐃",
            serverMessageId: 143
          },
          forwardingScore: 999,
          // Score to indicate it has been forwarded
          externalAdReply: {
            title: "𝐈𝐍𝐅𝐈𝐍𝐈𝐓𝐘-𝐌𝐃",
            body: "Here is your pairing code",
            thumbnailUrl: 'https://files.catbox.moe/chw9no.jpg',
            // Add thumbnail URL if required 
            sourceUrl: 'https://whatsapp.com/channel/0029Van0rwb5Ejy2o769hi0J',
            // Add source URL if necessary
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      }, {
        quoted: ms
      });
      await repondre("Here is your pair code, copy and paste it to the notification above or link devices.");
    } else {
      throw new Error("Invalid response from API.");
    }
  } catch (error) {
    console.error("Error getting API response:", error.message);
    repondre("Error getting response from API.");
  }
});
