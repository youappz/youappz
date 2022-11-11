import { frameworks as _frameworks } from '@vercel/frameworks';
import fs from 'fs/promises';
import tar from 'tar';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const repoRoot = join(__dirname, '..', '..');
const pubDir = join(__dirname, 'public');

const frameworks = _frameworks
  .sort(
    (a, b) =>
      (a.sort || Number.MAX_SAFE_INTEGER) - (b.sort || Number.MAX_SAFE_INTEGER)
  )
  .map(frameworkItem => {
    const framework = {
      ...frameworkItem,
      detectors: undefined,
      sort: undefined,
      dependency: undefined,
      defaultRoutes: undefined,
    };

    return framework;
  });

async function main() {
  console.log(`Building static frontend ${repoRoot}...`);

  await fs.rm(pubDir, { recursive: true, force: true });
  await fs.mkdir(pubDir + '/downloads', { recursive: true });

  const examples = await getExampleList();
  const pathListAll = join(pubDir, 'list-all.json');
  await fs.writeFile(pathListAll, JSON.stringify(examples));

  const exampleDirs = await fs.readdir(join(repoRoot, 'examples'), {
    withFileTypes: true,
  });

  const existingExamples = exampleDirs
    .filter(dir => dir.isDirectory())
    .map(dir => ({
      name: dir.name,
      visible: true,
      suggestions: [],
    }));

  const pathList = join(pubDir, 'list.json');
  await fs.writeFile(pathList, JSON.stringify([...existingExamples]));

  const tarballsDir = join(pubDir, 'downloads');

  for (const example of existingExamples) {
    const tarballName = `${example.name}.tar.gz`;
    const destTarballPath = join(tarballsDir, tarballName);
    tar.c(
      {
        gzip: true,
        file: destTarballPath,
      },
      [join(repoRoot, 'examples', example.name)]
    );
  }

  console.log('Completed building static frontend.');
}

main().catch(err => {
  console.log('error running build:', err);
  process.exit(1);
});

async function getExampleList() {
  return frameworks.map(framework => {
    return {
      example: framework.name,
      path: `/${framework.slug}`,
      demo: framework.demo,
      description: framework.description,
      tagline: framework.tagline,
      framework: framework.slug,
    };
  });
}
