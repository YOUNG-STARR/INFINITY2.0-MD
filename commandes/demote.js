const { infinityy } = require("../framework/infinityy");

infinityy({ nomCom: "demote", categorie: "Group", reaction: "📉" }, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  if (!ms.isGroup) return repondre("❌ Cette commande ne fonctionne que dans les groupes.");

  const metadata = await zk.groupMetadata(ms.from);
  const participants = metadata.participants;

  const botAdmin = participants.find(p => p.id === zk.decodeJid(zk.user.id))?.admin;
  if (!botAdmin) return repondre("🚫 Le bot doit être administrateur.");

  const senderAdmin = participants.find(p => p.id === ms.sender)?.admin;
  if (!senderAdmin) return repondre("🚫 Tu dois être admin pour retirer un admin.");

  const cible = ms.quoted?.participant || (ms.mentionedJid && ms.mentionedJid[0]);
  if (!cible) return repondre("🔁 Mentionne ou réponds à un membre pour le rétrograder.");

  const estDansGroupe = participants.some(p => p.id === cible);
  if (!estDansGroupe) return repondre("🚷 Cet utilisateur n’est pas dans le groupe.");

  const estAdmin = participants.find(p => p.id === cible)?.admin;
  if (!estAdmin) return repondre("🙃 Ce membre n'est même pas administrateur.");

  await zk.groupParticipantsUpdate(ms.from, [cible], "demote");
  repondre(`📉 @${cible.split("@")[0]} a été rétrogradé.`, { mentions: [cible] });
});
