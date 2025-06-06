import fs from 'fs';
import path from 'path';

const dbPath = path.resolve('database/profiles');

export function getProfile(jid) {
  const file = path.join(dbPath, `${jid}.json`);
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file));
  }
  return { coins: 0 };
}

export function saveProfile(jid, data) {
  const file = path.join(dbPath, `${jid}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}
