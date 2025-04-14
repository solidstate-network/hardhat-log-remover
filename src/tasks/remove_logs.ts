import { name as pluginName } from '../../package.json';
import regexp from '../lib/regexp';
import fs from 'fs';
import {
  TASK_COMPILE,
  TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS,
  TASK_COMPILE_SOLIDITY_GET_SOURCE_NAMES,
  TASK_COMPILE_SOLIDITY_GET_DEPENDENCY_GRAPH,
} from 'hardhat/builtin-tasks/task-names';
import { task } from 'hardhat/config';
import { HardhatPluginError } from 'hardhat/plugins';
import { ResolvedFile } from 'hardhat/types';

task(
  'remove-logs',
  'Removes console.log calls and imports from local source files',
  async (args, hre) => {
    try {
      await hre.run(TASK_COMPILE);
    } catch (e) {
      throw new HardhatPluginError(
        pluginName,
        'failed to compile contracts before removing logs',
      );
    }

    const sourcePaths = await hre.run(TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS);

    const sourceNames = await hre.run(TASK_COMPILE_SOLIDITY_GET_SOURCE_NAMES, {
      sourcePaths,
    });

    let graph = await hre.run(TASK_COMPILE_SOLIDITY_GET_DEPENDENCY_GRAPH, {
      sourceNames,
    });

    let count = 0;

    const files: ResolvedFile[] = graph.getResolvedFiles();

    files.forEach(({ absolutePath, content }) => {
      const { rawContent } = content;
      if (
        rawContent.includes('console.log') ||
        rawContent.includes('console.sol')
      ) {
        let output = rawContent
          .replace(regexp.imports, '')
          .replace(regexp.calls, '');

        fs.writeFileSync(absolutePath, output);
        count++;
      }
    });

    console.log(`Removed logs from ${count} sources.`);
  },
);
