const { infinityy } = require("../framework/infinityy");
const config = require("../set"); // Remplace par set.js et non settings

// Liste des motifs de liens à supprimer
const linkPatterns = [
  /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi,
  /https?:\/\/(www\.)?whatsapp\.com\/channel\/[a-zA-Z0-9_-]+/gi,
  /wa\.me\/\S+/gi,
  /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,
  /https?:\/\/(?:www\.)?youtube\.com\/\S+/gi,
  /https?:\/\/youtu\.be\/\S+/gi,
  /https?:\/\/(?:www\.)?facebook\.com\/\S+/gi,
  /https?:\/\/fb\.me\/\S+/gi,
  /https?:\/\/(?:www\.)?instagram\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?twitter\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?tiktok\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?linkedin\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?snapchat\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?pinterest\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?reddit\.com\/\S+/gi,
  /https?:\/\/ngl\/\S+/gi,
  /https?:\/\/(?:www\.)?discord\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?twitch\.tv\/\S+/gi,
  /https?:\/\/(?:www\.)?vimeo\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?dailymotion\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?medium\.com\/\S+/gi
];

// Détecteur automatique de liens
infinityy(
  {
    nomCom: "delete-links",
    fromMe: false,
    categorie: "Auto",
    reaction: "🚫",
    desc: "Supprime les messages contenant des liens (si activé)",
    filename: __filename
  },
  async (dest, zk, commandeOptions) => {
    const { ms } = commandeOptions;
    const isGroup = ms.isGroup;
    const isAdmin = ms.isAdmin;
    const isBotAdmin = ms.isBotAdmin;
    const body = ms.body || "";

    try {
      // Vérifie si on est dans un groupe et que le bot est admin
      if (!isGroup || !isBotAdmin) return;

      // Vérifie si l'option est activée dans set.js
      if (config.DELETE_LINKS !== "true") return;

      // Vérifie si un lien est détecté dans le message
      const hasLink = linkPatterns.some((pattern) => pattern.test(body));

      // Si un lien est détecté et que l'utilisateur n’est pas admin => supprime
      if (hasLink && !isAdmin) {
        await zk.sendMessage(ms.from, { delete: ms.key });
      }
    } catch (err) {
      console.error("Erreur delete-links:", err);
    }
  }
);
