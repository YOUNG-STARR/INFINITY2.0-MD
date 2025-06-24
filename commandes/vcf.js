
const { infinityy } = require("../framework/infinityy");
const fs = require('fs-extra');

infinityy({
  nomCom: 'vcf1',
  categorie: "Group",
  reaction: '📇'
}, async (dest, zk, commandeOptions) => {
  const { repondre, verifGroupe, verifAdmin, ms } = commandeOptions;

  if (!verifGroupe) {
    return repondre("❌ This command is only for group chats.");
  }

  if (!verifAdmin) {
    return repondre("❌ You must be an *admin* to use this command.");
  }

  try {
    // Fetch group metadata
    const metadata = await zk.groupMetadata(dest);
    const members = metadata.participants;
    let vcfData = "";
    let i = 1;

    for (const participant of members) {
      const num = participant.id.split('@')[0];
      vcfData += `BEGIN:VCARD\nVERSION:3.0\nFN:[${i}] +${num}\nTEL;type=CELL;type=VOICE;waid=${num}:+${num}\nEND:VCARD\n`;
      i++;
    }

    const filePath = './contacts.vcf';
    fs.writeFileSync(filePath, vcfData.trim(), 'utf-8');

    if (!fs.existsSync(filePath)) {
      return repondre("❌ Failed to generate the contact file.");
    }

    repondre(`📥 Generating VCF for *${metadata.subject}*...\n👥 Members: ${members.length}`);

    await zk.sendMessage(dest, {
      document: fs.readFileSync(filePath),
      mimetype: 'text/vcard',
      fileName: `${metadata.subject}.vcf`,
      caption: `✅ VCF Export Complete\n📂 Group: ${metadata.subject}\n👥 Total Contacts: ${members.length}\n\n> Powered by *INFINITY-MD*`
    }, { quoted: ms });

    fs.unlinkSync(filePath);
  } catch (err) {
    console.error("VCF Error:", err);
    repondre("❌ Error while exporting contacts.");
  }
});