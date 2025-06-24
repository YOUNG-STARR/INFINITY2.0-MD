
const { infinityy } = require("../framework/infinityy");
const { getAllSudoNumbers, isSudoTableNotEmpty } = require("../bdd/sudo");
const conf = require("../set");

infinityy({ nomCom: "owner", categorie: "General", reaction: "🤝" }, async (dest, zk, commandeOptions) => {
  const { ms, mybotpic } = commandeOptions;

  const thsudo = await isSudoTableNotEmpty();

  if (thsudo) {
    let msg = `*👑 My Super-User*\n\n`;
    msg += `*👤 Owner Number*\n`;
    msg += `- 🌟 @${conf.NUMERO_OWNER}\n\n`;
    msg += `------ *🧰 Other Sudo(s)* ------\n`;

    let sudos = await getAllSudoNumbers();

    for (const sudo of sudos) {
      if (sudo) {
        const sudonumero = sudo.replace(/[^0-9]/g, '');
        msg += `- 💼 @${sudonumero}\n`;
      }
    }

    const ownerjid = conf.NUMERO_OWNER.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
    const mentionedJid = sudos.map(s => s.replace(/[^0-9]/g, '') + "@s.whatsapp.net").concat([ownerjid]);

    // 🖼️ Essayer de récupérer la photo de l'utilisateur qui a tapé la commande
    let userProfilePic = mybotpic(); // valeur par défaut : bot
    try {
      userProfilePic = await zk.profilePictureUrl(ms.sender, "image");
    } catch (e) {
      console.log("❌ Erreur en récupérant la photo de l'utilisateur, on garde la photo par défaut.");
    }

    zk.sendMessage(dest, {
      image: { url: userProfilePic },
      caption: msg,
      mentions: mentionedJid
    });
  } else {
    // Aucun sudo trouvé, on envoie le contact vCard
    const vcard =
      'BEGIN:VCARD\n' +
      'VERSION:3.0\n' +
      'FN:' + conf.OWNER_NAME + '\n' +
      'ORG:undefined;\n' +
      'TEL;type=CELL;type=VOICE;waid=' + conf.NUMERO_OWNER + ':+' + conf.NUMERO_OWNER + '\n' +
      'END:VCARD';
    zk.sendMessage(dest, {
      contacts: {
        displayName: conf.OWNER_NAME,
        contacts: [{ vcard }],
      },
    }, { quoted: ms });
  }
});