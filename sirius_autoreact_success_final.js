if (conf.AUTO_REACT_STATUS?.toLowerCase() === 'yes' || conf.AUTO_READ_STATUS?.toLowerCase() === 'yes') {
    zk.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;

        for (const msg of messages) {
            const chat = msg.key.remoteJid;
            const fromMe = msg.key.fromMe;
            const isStatus = chat === 'status@broadcast';

            if (!isStatus || fromMe) continue;

            try {
                if (conf.AUTO_READ_STATUS?.toLowerCase() === 'yes') {
                    await zk.readMessages([msg.key]);
                    console.log("👀 Statut lu");
                }

                if (conf.AUTO_REACT_STATUS?.toLowerCase() === 'yes') {
                    const emojis_reaction = ['🔥', '❤️', '😍', '😎', '😂', '💯', '👌', '🥵', '🤩', '😘', '👍', '🙌'];
                    const emoji = emojis_reaction[Math.floor(Math.random() * emojis_reaction.length)];

                    await new Promise(res => setTimeout(res, Math.floor(Math.random() * 2000) + 2000));

                    await zk.sendMessage(chat, {
                        react: {
                            text: emoji,
                            key: msg.key
                        }
                    });

                    console.log(`✅ Réaction ${emoji} envoyée au statut de ${msg.pushName || msg.key.participant}`);
                }

            } catch (err) {
                console.error("❌ Erreur dans auto statut :", err.message);
            }
        }
    });
} else {
    console.log("ℹ️ AUTO_REACT_STATUS ou AUTO_READ_STATUS désactivé.");
}