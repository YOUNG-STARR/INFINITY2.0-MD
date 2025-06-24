
const { infinityy } = require('../framework/infinityy');

infinityy({
  nomCom: "tagall",
  categorie: "Group",
  reaction: "🔊"
}, async (dest, zk, commandeOptions) => {
  const { repondre, verifAdmin, superUser } = commandeOptions;

  try {
    // Check if user has rights
    if (!verifAdmin && !superUser) {
      return repondre("❌ Only group admins can use this command.");
    }

    // Get group metadata
    const metadata = await zk.groupMetadata(dest);
    const members = metadata.participants;

    if (!members || members.length === 0) {
      return repondre("🚫 No participants found.");
    }

    // Compose message with mentions
    let text = `🔊 *Group Members (${members.length}):*\n\n`;
    text += members.map(m => `@${m.id.split('@')[0]}`).join('\n');

    await zk.sendMessage(dest, {
      text,
      mentions: members.map(m => m.id)
    });
  } catch (err) {
    console.error("Tagall Error:", err);
    repondre("❌ An error occurred while tagging.");
  }
});