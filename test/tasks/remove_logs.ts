import fs from 'fs';
import hre from 'hardhat';
import assert from 'node:assert';
import { describe, it, before, afterEach } from 'node:test';

// TODO: store task name as constant and export
const TASK_REMOVE_LOGS = 'remove-logs';

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
    assert(contentsBefore.includes('console.log'));

    await hre.tasks.getTask(TASK_REMOVE_LOGS).run();

    const contentsAfter = await readContractSource('ContractWithLogs');
    assert(!contentsAfter.includes('console.log'));
  });

  it('removes console.sol imports from souce file', async () => {
    const contentsBefore = await readContractSource('ContractWithLogs');
    assert(contentsBefore.includes('console.sol'));

    await hre.tasks.getTask(TASK_REMOVE_LOGS).run();

    const contentsAfter = await readContractSource('ContractWithLogs');
    assert(!contentsAfter.includes('console.sol'));
  });
});
