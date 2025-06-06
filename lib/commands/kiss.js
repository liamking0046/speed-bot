export default {
  name: 'kiss',
  execute: async (sock, msg) => {
    await sock.sendMessage(msg.key.remoteJid, {
      video: { url: 'https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif' },
      caption: '😘 *Smooch!*'
    });
  }
};
