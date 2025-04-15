import regexp from '../lib/regexp.js';
import fs from 'node:fs';

export const removeLogs = async (sourcePaths: string[]) => {
  let count = 0;

  await Promise.all(
    sourcePaths.map(async (sourcePath) => {
      const content = await fs.promises.readFile(sourcePath, 'utf-8');

      if (content.includes('console.log') || content.includes('console.sol')) {
        const output = content
          .replace(regexp.imports, '')
          .replace(regexp.calls, '');

        await fs.promises.writeFile(sourcePath, output);
        count++;
      }
    }),
  );

  console.log(`Removed logs from ${count} sources.`);
};
