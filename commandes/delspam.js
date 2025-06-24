const { infinityy } = require("../framework/infinityy");

infinityy(
  {
    nomCom: "delspam",
    categorie: "Group",
    reaction: "🧹",
    desc: "Supprime les messages récents d’un utilisateur dans un groupe.",
    use: "[nombre de messages] @user",
    aliases: ["dlspam"]
  },
  async (dest, zk, commandeOptions) => {
    const { repondre, ms, arg } = commandeOptions;

    if (!ms.isGroup) return repondre("❌ *Cette commande fonctionne uniquement dans un groupe.*");
    if (!ms.isBotAdmin) return repondre("❌ *Le bot doit être administrateur.*");
    if (!ms.isAdmin && !ms.isCreator) return repondre("❌ *Seuls les admins peuvent utiliser cette commande.*");

    // Identifier l'utilisateur ciblé
    let cible = ms.quoted?.participant || (ms.mentionedJid?.[0] ?? null);
    if (!cible) return repondre("❌ *Mentionne un utilisateur ou réponds à son message.*");

    // Nombre de messages à supprimer
    const nombre = parseInt(arg[0]) || 5;
    const messages = await zk.loadMessages(ms.from);
    const messagesCible = messages.filter(
      (m) => m.key?.participant === cible || m.key?.remoteJid === cible
    ).slice(-nombre);

    if (messagesCible.length === 0) return repondre("⚠️ *Aucun message trouvé pour cet utilisateur.*");

    let supprimés = 0;
    for (const msg of messagesCible) {
      try {
        await zk.sendMessage(ms.from, { delete: msg.key });
        supprimés++;
      } catch (e) {
        console.log("Erreur suppression:", e);
      }
    }

    repondre(`✅ *${supprimés} message(s) supprimé(s) de @${cible.split("@")[0]}*`, { mentions: [cible] });
  }
);
