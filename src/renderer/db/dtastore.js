import Read from 'read-file-utf8';
import Loki from 'lokijs';
import path from 'path';
import { remote } from 'electron';

const db = new Loki(path.join(remote.app.getPath('userData'), '/data.json'));
try {
  const dataFile = Read(path.join(remote.app.getPath('userData'), '/data.json'));
  db.loadJSON(dataFile);
} catch (error) {}
// console.log(path.join(remote.app.getPath('userData')), db);
export default db;
