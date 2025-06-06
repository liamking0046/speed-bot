import { getProfile, saveProfile } from '../utils/profile.js';

export default {
  name: 'addcoins',
  execute: async (sock, msg, args) => {
    const amount = parseInt(args[0]);
    if (isNaN(amount)) return sock.sendMessage(msg.key.remoteJid, { text: 'Usage: .addcoins 50' });

    const jid = msg.key.participant || msg.key.remoteJid;
    const profile = getProfile(jid);
    profile.coins += amount;
    saveProfile(jid, profile);

    await sock.sendMessage(msg.key.remoteJid, { text: `✅ Added ${amount} coins.` });
  }
};
