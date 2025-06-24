const { infinityy } = require('../framework/infinityy'); const { ajouterUtilisateurAvecWarnCount, getWarnCountByJID, resetWarnCountByJID } = require('../bdd/warn'); const s = require("../set");

infinityy( { nomCom: 'warn', categorie: 'Group', reaction: '⚠️' }, async (dest, zk, commandeOptions) => { const { ms, arg, repondre, superUser, verifGroupe, verifAdmin, msgRepondu, auteurMsgRepondu } = commandeOptions;

if (!verifGroupe) {
  return repondre('❌ This command is for group use only.');
}

if (!verifAdmin && !superUser) {
  return repondre('❌ You are not an admin.');
}

if (!msgRepondu) {
  return repondre('❌ Please reply to a user's message to issue a warning.');
}

if (!arg || !arg[0] || arg.join('') === '') {
  await ajouterUtilisateurAvecWarnCount(auteurMsgRepondu);
  const warn = await getWarnCountByJID(auteurMsgRepondu);
  const warnLimit = s.WARN_COUNT;

  if (warn >= warnLimit) {
    await repondre('⚠️ This user has reached the warning limit and will now be removed.');
    await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "remove");
  } else {
    const remaining = warnLimit - warn;
    await repondre(`⚠️ User warned. Remaining warnings before kick: ${remaining}`);
  }
} else if (arg[0].toLowerCase() === 'reset') {
  await resetWarnCountByJID(auteurMsgRepondu);
  await repondre("✅ Warn count has been reset for this user.");
} else {
  await repondre('❌ Invalid argument. Use `.warn` or `.warn reset` by replying to a user's message.');
}

} );

