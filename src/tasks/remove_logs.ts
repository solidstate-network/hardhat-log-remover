import pkg from '../../package.json';
import regexp from '../lib/regexp.js';
import fs from 'fs';
import { task } from 'hardhat/config';
import { HardhatPluginError } from 'hardhat/plugins';

export default task('remove-logs')
  .setDescription(
    'Removes console.log calls and imports from local source files',
  )
  .setAction(async (args, hre) => {
    try {
      // TODO: import task name constant
      await hre.tasks.getTask('compile').run();
    } catch (e) {
      throw new HardhatPluginError(
        pkg.name,
        'failed to compile contracts before removing logs',
      );
    }

    const sourcePaths = await hre.solidity.getRootFilePaths();

    let count = 0;

    await Promise.all(
      sourcePaths.map(async (sourcePath) => {
        const content = await fs.promises.readFile(sourcePath, 'utf-8');

        if (
          content.includes('console.log') ||
          content.includes('console.sol')
        ) {
          const output = content
            .replace(regexp.imports, '')
            .replace(regexp.calls, '');

          await fs.promises.writeFile(sourcePath, output);
          count++;
        }
      }),
    );

    console.log(`Removed logs from ${count} sources.`);
  })
  .build();
