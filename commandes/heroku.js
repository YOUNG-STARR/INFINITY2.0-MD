const { infinityy } = require("../framework/infinityy");
const s = require("../set");

// --- START: SETTINGS COMMANDS ---

infinityy({
  nomCom: 'readstatus',
  categorie: "Settings"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, arg } = context;
  if (!superUser) return repondre("Restricted to bot owner.");
  if (!arg[0]) return repondre('Type "readstatus yes" or "readstatus no".');
  s.AUTO_READ_STATUS = arg[0] === 'yes' ? 'yes' : 'no';
  await zk.sendMessage(chatId, { text: `Read status ${s.AUTO_READ_STATUS === 'yes' ? 'enabled' : 'disabled'}.` }, { quoted: ms });
});

infinityy({
  nomCom: 'antidelete',
  categorie: "Settings"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, arg } = context;
  if (!superUser) return repondre("Restricted to bot owner.");
  if (!arg[0]) return repondre('Type "antidelete yes" or "antidelete no".');
  s.ADM = arg[0] === 'yes' ? 'yes' : 'no';
  await zk.sendMessage(chatId, { text: `Antidelete ${s.ADM === 'yes' ? 'enabled' : 'disabled'}.` }, { quoted: ms });
});

infinityy({
  nomCom: 'downloadstatus',
  categorie: "Settings"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, arg } = context;
  if (!superUser) return repondre("Restricted to bot owner.");
  if (!arg[0]) return repondre('Type "downloadstatus yes" or "downloadstatus no".');
  s.AUTO_DOWNLOAD_STATUS = arg[0] === 'yes' ? 'yes' : 'no';
  await zk.sendMessage(chatId, { text: `Download status ${s.AUTO_DOWNLOAD_STATUS === 'yes' ? 'enabled' : 'disabled'}.` }, { quoted: ms });
});

infinityy({
  nomCom: 'startmessage',
  categorie: "Settings"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, arg } = context;
  if (!superUser) return repondre("Restricted to bot owner.");
  if (!arg[0]) return repondre('Type "startmessage yes" or "startmessage no".');
  s.DP = arg[0] === 'yes' ? 'yes' : 'no';
  await zk.sendMessage(chatId, { text: `Start message ${s.DP === 'yes' ? 'enabled' : 'disabled'}.` }, { quoted: ms });
});

infinityy({
  nomCom: 'readmessage',
  categorie: "Settings"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, arg } = context;
  if (!superUser) return repondre("Restricted to bot owner.");
  if (!arg[0]) return repondre('Type "readmessage yes" or "readmessage no".');
  s.AUTO_READ_MESSAGES = arg[0] === 'yes' ? 'yes' : 'no';
  await zk.sendMessage(chatId, { text: `Read messages ${s.AUTO_READ_MESSAGES === 'yes' ? 'enabled' : 'disabled'}.` }, { quoted: ms });
});

infinityy({
  nomCom: 'pm-permit',
  categorie: "Settings"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, arg } = context;
  if (!superUser) return repondre("Restricted to bot owner.");
  if (!arg[0]) return repondre('Type "pm-permit yes" or "pm-permit no".');
  s.PM_PERMIT = arg[0] === 'yes' ? 'yes' : 'no';
  await zk.sendMessage(chatId, { text: `PM permit ${s.PM_PERMIT === 'yes' ? 'enabled' : 'disabled'}.` }, { quoted: ms });
});

infinityy({
  nomCom: 'chatbot',
  categorie: "Settings"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, arg } = context;
  if (!superUser) return repondre("Restricted to bot owner.");
  if (!arg[0]) return repondre('Type "chatbot yes" or "chatbot no".');
  s.CHAT_BOT = arg[0] === 'yes' ? 'yes' : 'no';
  await zk.sendMessage(chatId, { text: `Chatbot ${s.CHAT_BOT === 'yes' ? 'enabled' : 'disabled'}.` }, { quoted: ms });
});

infinityy({
  nomCom: 'greet',
  categorie: "Settings"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, arg } = context;
  if (!superUser) return repondre("Restricted to bot owner.");
  if (!arg[0]) return repondre('Type "greet yes" or "greet no".');
  s.AUTO_REPLY = arg[0] === 'yes' ? 'yes' : 'no';
  await zk.sendMessage(chatId, { text: `Greet ${s.AUTO_REPLY === 'yes' ? 'enabled' : 'disabled'}.` }, { quoted: ms });
});

infinityy({
  nomCom: 'antivv',
  categorie: "Settings"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, arg } = context;
  if (!superUser) return repondre("Restricted to bot owner.");
  if (!arg[0]) return repondre('Type "antivv yes" or "antivv no".');
  s.ANTI_VV = arg[0] === 'yes' ? 'yes' : 'no';
  await zk.sendMessage(chatId, { text: `Anti-VV ${s.ANTI_VV === 'yes' ? 'enabled' : 'disabled'}.` }, { quoted: ms });
});

infinityy({
  nomCom: 'publicmode',
  categorie: "Settings"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, arg } = context;
  if (!superUser) return repondre("Restricted to bot owner.");
  if (!arg[0]) return repondre('Type "publicmode yes" or "publicmode no".');
  s.MODE = arg[0] === 'yes' ? 'yes' : 'no';
  await zk.sendMessage(chatId, { text: `Public mode ${s.MODE === 'yes' ? 'enabled' : 'disabled'}.` }, { quoted: ms });
});

infinityy({
  nomCom: 'privatemode',
  categorie: "Settings"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, arg } = context;
  if (!superUser) return repondre("Restricted to bot owner.");
  if (!arg[0]) return repondre('Type "privatemode yes" or "privatemode no".');
  s.MODE = arg[0] === 'yes' ? 'yes' : 'no';
  await zk.sendMessage(chatId, { text: `Private mode ${s.MODE === 'yes' ? 'enabled' : 'disabled'}.` }, { quoted: ms });
});

infinityy({
  nomCom: 'alwaysonline',
  categorie: "Settings"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, arg } = context;
  if (!superUser) return repondre("Restricted to bot owner.");
  if (!arg[0]) return repondre('Type "alwaysonline yes" or "alwaysonline no".');
  s.ETAT = arg[0] === 'yes' ? '1' : 'no';
  await zk.sendMessage(chatId, { text: `Always online ${s.ETAT === '1' ? 'enabled' : 'disabled'}.` }, { quoted: ms });
});

infinityy({
  nomCom: 'autotyping',
  categorie: "Settings"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, arg } = context;
  if (!superUser) return repondre("Restricted to bot owner.");
  if (!arg[0]) return repondre('Type "autotyping yes" or "autotyping no".');
  s.ETAT = arg[0] === 'yes' ? '2' : 'no';
  await zk.sendMessage(chatId, { text: `Autotyping ${s.ETAT === '2' ? 'enabled' : 'disabled'}.` }, { quoted: ms });
});

infinityy({
  nomCom: 'autorecord',
  categorie: "Settings"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, arg } = context;
  if (!superUser) return repondre("Restricted to bot owner.");
  if (!arg[0]) return repondre('Type "autorecord yes" or "autorecord no".');
  s.ETAT = arg[0] === 'yes' ? '3' : 'no';
  await zk.sendMessage(chatId, { text: `Autorecord ${s.ETAT === '3' ? 'enabled' : 'disabled'}.` }, { quoted: ms });
});

// --- END: SETTINGS COMMANDS ---
