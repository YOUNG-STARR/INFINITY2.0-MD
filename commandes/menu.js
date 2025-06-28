const util = require('util');
const fs = require('fs-extra');
const { infinityy } = require(__dirname + "/../framework/infinityy");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

infinityy({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/infinityy");
    let coms = {};
    let mode = (s.MODE.toLowerCase() === "yes") ? "🌍 Public" : "🔒 Privé";

    cm.map((com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault("America/Port-au-Prince");
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
┏━━『 𝐈𝐍𝐅𝐈𝐍𝐈𝐓𝐘-𝐌𝐃 』━━┓
┃👤 User    : *${nomAuteurMessage}*
┃📆 Date    : *${date}*
┃⏰ Time    : *${temps}*
┃🌍 Mode    : *${mode}*
┃⚙️ Prefix  : *${prefixe}*
┃🖥️ System  : *${os.platform()}*
┃📊 RAM     : *${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB*
┃🧩 Commands: *${Object.keys(cm).length}*
┃👑 Owner   : *SIRIUS*
┗━━━━━━━━━━━━━┛

${readMore}
┌───『 COMMANDS 』───⭓`;

    let menuMsg = ``;

    for (const cat in coms) {
        menuMsg += `\n│\n│ ♾️ *${cat.toUpperCase()}*\n│────────────`;
        for (let i = 0; i < coms[cat].length; i++) {
            menuMsg += `\n│ → .${coms[cat][i]}`;
        }
        menuMsg += `\n│──────────────`;
    }

    menuMsg += `\n> 𝙥𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 𝙎𝙄𝙍𝙄𝙐𝙎*`;

    const imageUrl = "https://files.catbox.moe/ri4lao.jpg";

    try {
        zk.sendMessage(dest, {
            image: { url: imageUrl },
            caption: infoMsg + menuMsg,
            footer: "𝐈𝐍𝐅𝐈𝐍𝐈𝐓𝐘-𝐌𝐃"
        }, { quoted: ms });
    } catch (e) {
        console.log("🥵 Menu error: " + e);
        repondre("🥵 Menu error: " + e);
    }
});
