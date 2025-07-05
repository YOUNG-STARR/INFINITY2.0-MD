const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
const path = require("path");

// Chargement des variables d'environnement si le fichier existe
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

// Définir le chemin de la base de données locale
const databasePath = path.join(__dirname, './database.db');

// Déterminer l'URL de la base de données
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;

// Exportation de toute la configuration dans un seul objet
module.exports = {
    ATD: 'oui', // Active Anti-Delete (mettre 'non' pour désactiver)

    session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUs5Mzl1dFRHVlFyMitDVDY0a2NQQWZwOGs1YmRFanBJWUFMZWVlbEIxOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT2pXRUtyT2FHYjYxRElzakpJWENNU0kxbWVXZGdEeGpNcjNTQ3publJIVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhTytQZnNncHZrOW5FUG1FZ1ZnSVYxRjRCdHIranpuamJBbVMzQXlxMlcwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxYkluSHZIYzNlb3ZSYnhHSlUzRU11cnE1OXU5bjBIa2ZNYWtuZjYwYlNRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVLd2IvSWxGQUE5YnZkTTJSY1pzUUFidE0zbG5CVEhNU3BBM0I2Qk1Kblk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilk4cWFReW8yclo1Si82bHlHaVh6L0lGcjRxL0dlT1NsV0FrMGo0VjdNMWM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidURTcyt6aHdRUFVTOWg0MHJyb1ZBbTd2aFpzaTV3emZOL1JqczRCVGluRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOHhYTG9RVEh3Sm1Bc1ErRzBWaXlQQjk0a2ozTCt1U3pmN21oOHVYNXdXND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjM2ZkVBTXBDc3puK0kvWUlCZTkyYVlPS29GOEkvNkZSV0F4bmw4RVIzOUZnazRRZDNWdyt1YUtxMUVSZFpUSjFKME5Memt0dWdzQTRZRFpZSWlXRURnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ2LCJhZHZTZWNyZXRLZXkiOiJzQ0gvd3VTTFhYWkRuc1hWRi9IaGQvMVdycE1uOXNEcGpXZ1hQUVJ4dmRFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQ3NjE1ODYyQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkU5QkI2MDIyOEE1RTkxMDQyMTc4MDY2RTlBNkUyQjNCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTE2OTQwNTl9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUwOTQ3NjE1ODYyQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjU5OEE2MEJDMUM5ODYxRjQ0NkZCMjk2NkQ5RDI3MjU0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTE2OTQwNjN9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IlFEM0gzOFlKIiwibWUiOnsiaWQiOiI1MDk0NzYxNTg2Mjo3MkBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjYwMzA2NzA5NzA5Nzg6NzJAbGlkIiwibmFtZSI6IvCdloTwnZaU8J2WmvCdlpPwnZaMIPCdlpjwnZaZ8J2WhvCdlpfvrqnZqNmA766p766p2agifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05ldGpwOEZFTS8xb3NNR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlJhWVRCYWJDcmRrQVdFdGxGNGVsdEUwN0tCbTgwbkY4Tk85S2dUM2dNbGc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkNUckxGRndnUzNRMkJuWFB2LzlJZEdqQWxlZllqSlVRNVdyTEZlUXh3RzJtM0ZCMzgvbTVwVjBPakJ6R1hYSTZKV1QxbENtZkJEYnNrOUY2RVd1U0JBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJNbmI0UnBMQk5hNUNNcU96RDlPdGl3YytwZzJEanNVc1gvL3JSb01Na3ltQ0Z2dUFjbEZMUGtFUHBqeDNheDh4NWxaaW9FSHUxdXpNNU9ab0dOOFpBQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjUwOTQ3NjE1ODYyOjcyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVXbUV3V213cTNaQUZoTFpSZUhwYlJOT3lnWnZOSnhmRFR2U29FOTRESlkifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlFZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MTY5NDA0NSwibGFzdFByb3BIYXNoIjoibm0zQmIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU5JbSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "SIRIUS THE PARADOX",
    NUMERO_OWNER: process.env.NUMERO_OWNER || "50939103464",

    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || "no",
    BOT: process.env.BOT_NAME || "INFINITY-MD",
    URL: process.env.BOT_MENU_LINKS || "https://files.catbox.moe/rmi418.jpg",
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || "yes",

    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY: process.env.HEROKU_APY_KEY,

    WARN_COUNT: process.env.WARN_COUNT || "3",
    ETAT: process.env.PRESENCE || "3",
    CHATBOT: process.env.CHATBOT || "yes",
    DP: process.env.STARTING_BOT_MESSAGE || "yes",

    ADM: process.env.ANTI_DELETE_MESSAGE || "yes",
    ANTIDELETE1: process.env.ANTIDELETE1 || "yes",
    ANTIDELETE2: process.env.ANTIDELETE2 || "yes",

    SIRIUS_CHATBOT: process.env.SIRIUS_CHATBOT || "yes",
    ANTICALL: process.env.ANTICALL || "no",

    AUTO_REACT: process.env.AUTO_REACT || "no",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || "yes",
    AUTO_REPLY: process.env.AUTO_REPLY || "yes",
    AUTO_READ: process.env.AUTO_READ || "no",
    AUTO_SAVE_CONTACTS: process.env.AUTO_SAVE_CONTACTS || "no",
    AUTO_REJECT_CALL: process.env.AUTO_REJECT_CALL || "no",
    AUTO_BIO: process.env.AUTO_BIO || "yes",
    AUDIO_REPLY: process.env.AUDIO_REPLY || "yes",
    AUTO_TAG_STATUS: process.env.AUTO_TAG_STATUS || "yes",

    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway"
        : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
};

// Rechargement automatique du fichier en cas de modification
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
