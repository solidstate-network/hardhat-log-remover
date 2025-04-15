import pkg from '../../package.json';
import regexp from '../lib/regexp.js';
import { HardhatPluginError } from 'hardhat/plugins';
import { NewTaskActionFunction } from 'hardhat/types/tasks';
import fs from 'node:fs';

const action: NewTaskActionFunction = async (args, hre) => {
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

export default action;
