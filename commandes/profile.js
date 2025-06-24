

const { infinityy } = require("../framework/infinityy");
const conf = require("../set");
const { jidDecode } = require("@whiskeysockets/baileys");

infinityy({
  nomCom: "profile",
  categorie: "Fun"
}, async (dest, zk, commandeOptions) => {

  const {
    ms,
    repondre,
    auteurMessage,
    nomAuteurMessage,
    msgRepondu,
    auteurMsgRepondu
  } = commandeOptions;

  let jid = msgRepondu ? auteurMsgRepondu : auteurMessage;
  let nom = msgRepondu ? "@" + auteurMsgRepondu.split("@")[0] : nomAuteurMessage;
  let mentions = msgRepondu ? [auteurMsgRepondu] : [];

  let ppUrl;
  try {
    ppUrl = await zk.profilePictureUrl(jid, 'image');
  } catch {
    ppUrl = conf.IMAGE_MENU; // image par défaut
  }

  let status = await zk.fetchStatus(jid);

  const caption = `*👤 Nom :* ${nom}\n*📝 Status :*\n${status.status}`;

  const message = {
    image: { url: ppUrl },
    caption: caption,
    mentions: mentions,
    footer: "✨ INFINITY-MD ✨",
    contextInfo: {
      externalAdReply: {
        title: "Profil utilisateur",
        body: "INFINITY-MD",
        thumbnailUrl: ppUrl,
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: "" // ajoute un lien ici si tu veux rediriger quelque part
      }
    }
  };

  zk.sendMessage(dest, message, { quoted: ms });

});