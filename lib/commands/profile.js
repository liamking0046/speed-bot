import { getProfile } from '../utils/profile.js';

export default {
  name: 'profile',
  execute: async (sock, msg) => {
    const profile = getProfile(msg.key.participant || msg.key.remoteJid);
    await sock.sendMessage(msg.key.remoteJid, { text: `💰 Coins: ${profile.coins}` });
  }
};
