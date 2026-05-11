import path from 'path';
import fs from 'fs';
import os from 'os';
import {fileURLToPath} from 'url';
import {jest} from '@jest/globals';

const testDir = path.dirname(fileURLToPath(import.meta.url));
const testHome = path.join(os.tmpdir(), 'actions-gh-pages-test-home');
fs.mkdirSync(testHome, {recursive: true});

if (process.platform === 'win32') {
  process.env.USERPROFILE = process.env.USERPROFILE || testHome;
} else {
  process.env.HOME = testHome;
}

globalThis.jest = jest;
globalThis.__dirname = testDir;
