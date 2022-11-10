import path from 'path';

import { InvalidLocalConfig } from '../errors';

import getArgs from '../../util/get-args';

export default function getLocalPathConfig(prefix: string) {
  let customPath: string | undefined;

  const argv = getArgs(process.argv.slice(2), {}, { permissive: true });
  customPath = argv['--local-config'];

  // If `--local-config` flag was specified, then that takes priority
  if (customPath) {
    if (typeof customPath !== 'string') {
      throw new InvalidLocalConfig(customPath);
    }
    return path.resolve(prefix, customPath);
  }

  const vercelConfigPath = path.join(prefix, 'appz.json');

  return vercelConfigPath;
}
