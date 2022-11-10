import path from 'path';
import { fileNameSymbol } from '@vercel/client';
import {
  CantParseJSONFile,
  CantFindConfig,
  WorkingDirectoryDoesNotExist,
} from './errors-ts';
import humanizePath from './humanize-path';
import readJSONFile from './read-json-file';
import { VercelConfig } from './dev/types';
import { Output } from './output';
import { isErrnoException } from './is-error';

let config: VercelConfig;

export default async function getConfig(
  output: Output,
  configFile?: string
): Promise<VercelConfig | Error> {
  // If config was already read, just return it
  if (config) {
    return config;
  }

  let localPath: string;
  try {
    localPath = process.cwd();
  } catch (err: unknown) {
    if (isErrnoException(err) && err.code === 'ENOENT') {
      return new WorkingDirectoryDoesNotExist();
    }
    throw err;
  }

  // First try with the config supplied by the user via --local-config
  if (configFile) {
    const localFilePath = path.resolve(localPath, configFile);
    output.debug(
      `Found config in provided --local-config path ${localFilePath}`
    );
    const localConfig = await readJSONFile<VercelConfig>(localFilePath);
    if (localConfig instanceof CantParseJSONFile) {
      return localConfig;
    }

    if (localConfig === null) {
      return new CantFindConfig([humanizePath(localFilePath)]);
    }

    config = localConfig;
    config[fileNameSymbol] = configFile;
    return config;
  }

  const vercelFilePath = path.resolve(localPath, 'appz.json');

  const [vercelConfig] = await Promise.all([
    readJSONFile<VercelConfig>(vercelFilePath),
  ]);
  if (vercelConfig instanceof CantParseJSONFile) {
    return vercelConfig;
  }

  if (vercelConfig !== null) {
    output.debug(`Found config in file "${vercelFilePath}"`);
    config = vercelConfig;
    config[fileNameSymbol] = 'appz.json';
    return config;
  }

  // If we couldn't find the config anywhere return error
  return new CantFindConfig([vercelFilePath].map(humanizePath));
}
