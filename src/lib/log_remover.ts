import regexp from '../lib/regexp.js';
import { readUtf8File, writeUtf8File } from '@nomicfoundation/hardhat-utils/fs';

export const removeLogs = async (sourcePaths: string[]) => {
  let count = 0;

  await Promise.all(
    sourcePaths.map(async (sourcePath) => {
      const content = await readUtf8File(sourcePath);

      if (content.includes('console.log') || content.includes('console.sol')) {
        const output = content
          .replace(regexp.imports, '')
          .replace(regexp.calls, '');

        await writeUtf8File(sourcePath, output);
        count++;
      }
    }),
  );

  console.log(`Removed logs from ${count} sources.`);
};
