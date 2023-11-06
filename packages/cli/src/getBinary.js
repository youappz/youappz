import { createRequire } from 'node:module';
import { Binary } from './binary-install.js';
import os from 'node:os';
import path from 'node:path';

function getPlatform() {
  const type = os.type();
  const arch = os.arch();

  if (type === 'Windows_NT') {
    return {
      platform: 'appz-win-x64',
      name: 'appz.exe',
    };
  }

  if (type === 'Linux' && arch === 'x64') {
    return {
      platform: 'appz-linux-x64',
      name: 'appz',
    };
  }

  if (type === 'Linux' && arch === 'arm64') {
    return {
      platform: 'appz-linux-arm64',
      name: 'appz',
    };
  }

  if (type === 'Darwin' && arch === 'x64') {
    return {
      platform: 'appz-darwin-x64',
      name: 'appz',
    };
  }

  if (type === 'Darwin' && arch === 'arm64') {
    return {
      platform: 'appz-darwin-arm64',
      name: 'appz',
    };
  }

  throw new Error(`Unsupported platform: ${type} ${arch}`);
}

export function getBinary() {
  const { platform, name } = getPlatform();
  const customRequire = createRequire(import.meta.url);

  const { name: packageName, version } = customRequire('../package.json');

  const url = `https://github.com/youappz/youappz/releases/download/${packageName}@${version}/${platform}.tar.gz`;
  const installDirectory = path.join(os.homedir(), '.appz');

  return new Binary(url, { name, installDirectory });
}