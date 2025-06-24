const { infinityy } = require("../framework/infinityy");
const axios = require("axios");
const conf = require(__dirname + "/../set"); // 🔧 Chemin corrigé

// Fonction de téléchargement
const handleDownload = async (dest, zk, params, serviceName, apiUrl, exampleUsage) => {
  const { repondre, arg } = params;
  const query = arg.join(" ").trim();

  if (!query) return repondre(exampleUsage);

  try {
    const response = await axios.get(`${apiUrl}${encodeURIComponent(query)}`, { timeout: 15000 });
    const result = response.data.link || response.data.url || "No download link found.";

    await zk.sendMessage(dest, {
      text: `📥 *${serviceName} Download:*\n\n🔗 *Link:* ${result}\n\n✅ Enjoy your download!`,
      contextInfo: {
        externalAdReply: {
          title: conf.BOT,
          body: "Fast & Reliable Downloads",
          thumbnailUrl: conf.URL,
          sourceUrl: "",
          mediaType: 1,
          showAdAttribution: true,
        },
      },
    });
  } catch (error) {
    console.error(`Error downloading from ${serviceName}:`, error.message);
    await repondre(`❌ Failed to fetch ${serviceName} download. Try again later.`);
  }
};

// Liste des téléchargeurs
const downloaders = [
  { name: "ytmp3", aliases: ["yt-audio"], url: "https://bk9.fun/download/ytmp3?q=", example: "ytmp3 https://youtube.com/..." },
  { name: "ytmp4", aliases: ["yt-video"], url: "https://bk9.fun/download/ytmp4?q=", example: "ytmp4 https://youtube.com/..." },
  { name: "facebook", aliases: ["fb", "fbdown"], url: "https://bk9.fun/download/facebook?q=", example: "facebook https://facebook.com/..." },
  { name: "instagram", aliases: ["ig", "igdown"], url: "https://bk9.fun/download/instagram?q=", example: "instagram https://instagram.com/..." },
  { name: "tiktok", aliases: ["tt", "ttdown"], url: "https://bk9.fun/download/tiktok?q=", example: "tiktok https://tiktok.com/..." },
  { name: "twitter", aliases: ["x", "twdown"], url: "https://bk9.fun/download/twitter?q=", example: "twitter https://twitter.com/..." },
  { name: "spotify", aliases: ["sp", "spotifydown"], url: "https://bk9.fun/download/spotify?q=", example: "spotify https://open.spotify.com/..." },
  { name: "soundcloud", aliases: ["sc", "scdown"], url: "https://bk9.fun/download/soundcloud?q=", example: "soundcloud https://soundcloud.com/..." },
];

// Enregistrement dynamique
downloaders.forEach(dl => {
  infinityy({
    nomCom: dl.name,
    aliases: dl.aliases,
    reaction: "📥",
    categorie: "Downloader",
  }, async (dest, zk, params) => {
    handleDownload(dest, zk, params, dl.name.toUpperCase(), dl.url, dl.example);
  });
});
