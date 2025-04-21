import { TASK_REMOVE_LOGS } from '../../src/task_names.js';
import fs from 'fs';
import hre from 'hardhat';
import assert from 'node:assert';
import { describe, it, before, afterEach } from 'node:test';

const readContractSource = async (name: string) => {
  const artifact = await hre.artifacts.readArtifact(name);
  return fs.readFileSync(artifact.sourceName).toString();
};

describe(TASK_REMOVE_LOGS, () => {
  const cache: { [sourcePath: string]: string } = {};

  before(async () => {
    const sourcePaths = await hre.solidity.getRootFilePaths();

    for (const sourcePath of sourcePaths) {
      cache[sourcePath] = fs.readFileSync(sourcePath).toString();
    }
  });

  afterEach(async () => {
    for (const sourcePath in cache) {
      fs.writeFileSync(sourcePath, cache[sourcePath]);
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
