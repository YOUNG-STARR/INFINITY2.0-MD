const cron = require('node-cron');
const moment = require('moment-timezone');
const config = require("../set"); // ou "../set"

const { infinityy } = require("../framework/infinityy");

let scheduledTasks = {};

infinityy(
  {
    nomCom: "group",
    categorie: "Groupe",
    reaction: "👥",
    desc: "Permet d'ouvrir ou de fermer le groupe immédiatement ou à une heure précise.",
  },
  async (dest, zk, commandeOptions) => {
    const { repondre, ms, arg } = commandeOptions;

    if (!ms.isGroup) return repondre("*📛 CETTE COMMANDE FONCTIONNE UNIQUEMENT DANS LES GROUPES*");

    const metadata = await zk.groupMetadata(ms.from);
    const participants = metadata.participants;
    const botNumber = await zk.decodeJid(zk.user.id);
    const botAdmin = participants.find(p => p.id === botNumber)?.admin;
    const senderAdmin = participants.find(p => p.id === ms.sender)?.admin;

    if (!botAdmin) return repondre("*📛 LE BOT DOIT ÊTRE ADMIN POUR UTILISER CETTE COMMANDE*");
    if (!senderAdmin) return repondre("*📛 TU DOIS ÊTRE ADMIN POUR UTILISER CETTE COMMANDE*");

    if (!arg[0]) {
      return repondre(`🔧 Utilisation : ${config.PREFIXE}group open/close [hh:mm AM/PM]\n\nExemples :\n${config.PREFIXE}group open\n${config.PREFIXE}group close 10:30 PM`);
    }

    const action = arg[0].toLowerCase();
    const time = arg.slice(1).join(" ");

    // Action immédiate
    if (!time) {
      if (action === "open") {
        await zk.groupSettingUpdate(ms.from, "not_announcement");
        return repondre("✅ Groupe *ouvert* avec succès !");
      } else if (action === "close") {
        await zk.groupSettingUpdate(ms.from, "announcement");
        return repondre("✅ Groupe *fermé* avec succès !");
      } else {
        return repondre("❌ Action invalide. Utilise `open` ou `close`.");
      }
    }

    // Vérification de l'heure
    if (!/^\d{1,2}:\d{2}\s*(AM|PM)$/i.test(time)) {
      return repondre("🕒 Format invalide. Utilise HH:mm AM/PM\nEx: 04:00 PM");
    }

    const [hour, minute] = moment(time, ['h:mm A', 'hh:mm A']).format('HH:mm').split(':').map(Number);
    const cronTime = `${minute} ${hour} * * *`;

    // Supprimer ancienne tâche si existante
    if (scheduledTasks[ms.from]) {
      scheduledTasks[ms.from].stop();
      delete scheduledTasks[ms.from];
    }

    // Planification
    scheduledTasks[ms.from] = cron.schedule(cronTime, async () => {
      try {
        const type = action === "close" ? "announcement" : "not_announcement";
        await zk.groupSettingUpdate(ms.from, type);
        await zk.sendMessage(ms.from, {
          text: `🔁 Groupe automatiquement *${action === 'close' ? 'fermé' : 'ouvert'}*.`
        });
      } catch (err) {
        console.error("⛔ Erreur CRON :", err);
        await zk.sendMessage(ms.from, { text: "❌ Erreur durant l'exécution automatique." });
      }
    }, {
      timezone: "America/Port-au-Prince"
    });

    return repondre(`⏳ Le groupe sera *${action === 'close' ? 'fermé' : 'ouvert'}* à *${time} IST* automatiquement.`);
  }
);
