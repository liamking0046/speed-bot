export default {
  name: 'menu',
  execute: async (sock, msg) => {
    const text = `👑 *Liam Arendsen's Bot*\n📞 Contact: 0833098338\n\nCommands:\n.menu\n.profile\n.addcoins\n.kiss`;
    await sock.sendMessage(msg.key.remoteJid, { text });
  }
};
