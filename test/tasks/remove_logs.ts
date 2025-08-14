import { TASK_REMOVE_LOGS } from '../../src/task_names.js';
import { readUtf8File, writeUtf8File } from '@nomicfoundation/hardhat-utils/fs';
import hre from 'hardhat';
import assert from 'node:assert';
import { describe, it, before, afterEach } from 'node:test';

const readContractSource = async (name: string) => {
  const artifact = await hre.artifacts.readArtifact(name);
  return await readUtf8File(artifact.sourceName);
};

describe(TASK_REMOVE_LOGS, () => {
  const cache: { [sourcePath: string]: string } = {};

  before(async () => {
    const sourcePaths = await hre.solidity.getRootFilePaths();

    for (const sourcePath of sourcePaths) {
      cache[sourcePath] = await readUtf8File(sourcePath);
    }
  });

  afterEach(async () => {
    for (const sourcePath in cache) {
      await writeUtf8File(sourcePath, cache[sourcePath]);
    }
  });

  it('removes console.log calls from source file', async () => {
    const contentsBefore = await readContractSource('ContractWithLogs');
    assert.match(contentsBefore, /console/);

    await hre.tasks.getTask(TASK_REMOVE_LOGS).run();

    const contentsAfter = await readContractSource('ContractWithLogs');
    assert.doesNotMatch(contentsAfter, /console/);
  });

  it('removes console.sol imports from souce file', async () => {
    const contentsBefore = await readContractSource('ContractWithLogs');
    assert.match(contentsBefore, /console/);

    await hre.tasks.getTask(TASK_REMOVE_LOGS).run();

    const contentsAfter = await readContractSource('ContractWithLogs');
    assert.doesNotMatch(contentsAfter, /console/);
  });
});
