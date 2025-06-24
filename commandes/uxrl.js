
const { infinityy } = require("../framework/infinityy");
const { Catbox } = require("node-catbox");
const fs = require("fs-extra");
const { downloadMediaMessage } = require("@whiskeysockets/baileys");

// Initialiser Catbox
const catbox = new Catbox();

// Fonction d'upload vers Catbox
async function uploadToCatbox(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }
  try {
    const uploadResult = await catbox.uploadFile({ path: filePath });
    if (uploadResult) {
      return uploadResult;
    } else {
      throw new Error("Error retrieving file link");
    }
  } catch (error) {
    throw new Error(String(error));
  }
}

// Commande pour générer un lien Catbox à partir d’un média
infinityy({
  nomCom: "url1",
  categorie: "General",
  reaction: "⛓️"
}, async (dest, zk, commandeOptions) => {
  const { msgRepondu, repondre, ms } = commandeOptions;

  if (!msgRepondu) {
    return repondre("❌ Veuillez répondre à une image, vidéo, audio ou document.");
  }

  let mediaPath;

  try {
    // Télécharge le média quelle que soit sa nature
    mediaPath = await downloadMediaMessage(msgRepondu, "buffer", {}, { logger: console });
    if (!mediaPath) return repondre("❌ Erreur lors du téléchargement du fichier.");

    const tmpPath = "./temp_" + Date.now();
    await fs.writeFile(tmpPath, mediaPath);

    const fileUrl = await uploadToCatbox(tmpPath);
    await fs.unlinkSync(tmpPath);

    return repondre(`✅ Fichier uploadé :\n${fileUrl}`);
  } catch (error) {
    console.error("❌ Upload Error:", error);
    return repondre("❌ Une erreur s'est produite lors de l'envoi du fichier.");
  }
});