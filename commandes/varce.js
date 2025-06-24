
const { infinityy } = require("../framework/infinityy");
const axios = require("axios");

infinityy({
  nomCom: "lyrics",
  reaction: '🎶',
  categorie: "Search"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  if (!arg || arg.length === 0) {
    return repondre("❌ Please provide the name of a song.\n\nExample: .lyrics Shape of You");
  }

  const songName = arg.join(" ");

  try {
    const response = await axios.get(`https://samirxpikachuio.onrender.com/lyrics?query=${encodeURIComponent(songName)}`);

    if (response.data && response.data.lyrics) {
      const lyrics = response.data.lyrics;
      const title = response.data.title || songName;

      await zk.sendMessage(dest, {
        text: `🎵 *Lyrics for:* ${title}\n\n${lyrics}`
      }, { quoted: ms });
    } else {
      return repondre(`❌ No lyrics found for *${songName}*. Try a different song.`);
    }
  } catch (error) {
    console.error("Lyrics error:", error);
    return repondre("❌ An error occurred while fetching the lyrics.");
  }
});