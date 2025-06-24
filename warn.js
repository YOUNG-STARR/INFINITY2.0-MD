//sirius owner//
//dont coppy

const { infinityy } = require('../framework/infinityy');
const { ajouterUtilisateurAvecWarnCount, getWarnCountByJID, resetWarnCountByJID } = require('../bdd/warn');
const s = require("../set");

infinityy(
  {
    nomCom: 'warn',
    categorie: 'Group',
    reaction: "⚠️",
    desc: "Warn a group member and remove them if warning limit is reached."
  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre, superUser, verifGroupe, verifAdmin, msgRepondu, auteurMsgRepondu } = commandeOptions;

    // Ensure it's in a group
    if (!verifGroupe) return repondre('❌ This command only works in groups.');

    // Only admins or superUsers
    if (!verifAdmin && !superUser) return repondre('🚫 You must be an admin to use this command.');

    // Message must be replied to
    if (!msgRepondu) return repondre('📌 Reply to a user message to warn them.');

    const action = arg[0]?.toLowerCase();
    const warnLimit = s.WARN_COUNT || 3;

    if (!action || action === '') {
      // Add warning
      await ajouterUtilisateurAvecWarnCount(auteurMsgRepondu);
      const warn = await getWarnCountByJID(auteurMsgRepondu);

      if (warn >= warnLimit) {
        await repondre(`⚠️ This user reached the warning limit (${warnLimit}). Removing from group...`);
        await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "remove");
      } else {
        const remaining = warnLimit - warn;
        repondre(`⚠️ User warned. Remaining before kick: ${remaining}`);
      }

    } else if (action === 'reset') {
      // Reset warning
      await resetWarnCountByJID(auteurMsgRepondu);
      repondre(`✅ Warning count reset for this user.`);

    } else {
      repondre('❌ Invalid usage. Use `.warn` or `.warn reset` while replying to a user.');
    }
  }
);