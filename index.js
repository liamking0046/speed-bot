import makeWASocket, { useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } from '@whiskeysockets/baileys';
import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const commands = new Map();

// Load commands from /lib/commands
const commandFiles = readdirSync(path.join(__dirname, 'lib/commands'));
for (const file of commandFiles) {
  const command = await import(`./lib/commands/${file}`);
  commands.set(command.default.name, command.default.execute);
}

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./auth');
  const { version } = await fetchLatestBaileysVersion();
  const sock = makeWASocket({ auth: state, version });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || !msg.key.remoteJid || msg.key.fromMe) return;

    const body = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
    if (!body.startsWith('.')) return;

    const args = body.trim().split(/\s+/);
    const cmd = args[0].slice(1).toLowerCase();

    if (commands.has(cmd)) {
      try {
        await commands.get(cmd)(sock, msg, args.slice(1));
      } catch (err) {
        console.error('Command error:', err);
        sock.sendMessage(msg.key.remoteJid, { text: '⚠️ Command error' });
      }
    }
  });
}

startBot();
