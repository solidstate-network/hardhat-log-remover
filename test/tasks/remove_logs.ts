import { expect } from 'chai';
import fs from 'fs';
import hre from 'hardhat';
import { TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS } from 'hardhat/builtin-tasks/task-names';

const TASK_REMOVE_LOGS = 'remove-logs';

const readContractSource = async (name: string) => {
  const artifact = await hre.artifacts.readArtifact(name);
  return fs.readFileSync(artifact.sourceName).toString();
};

describe(TASK_REMOVE_LOGS, () => {
  const cache: { [sourcePath: string]: string } = {};

  before(async () => {
    const sourcePaths: string[] = await hre.run(
      TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS,
    );

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
    expect(contentsBefore).to.include('console.log');

    await hre.run(TASK_REMOVE_LOGS);

    const contentsAfter = await readContractSource('ContractWithLogs');
    expect(contentsAfter).not.to.include('console.sol');
  });

  it('removes console.sol imports from souce file', async () => {
    const contentsBefore = await readContractSource('ContractWithLogs');
    expect(contentsBefore).to.include('console.sol');

    await hre.run(TASK_REMOVE_LOGS);

    const contentsAfter = await readContractSource('ContractWithLogs');
    expect(contentsAfter).not.to.include('console.sol');
  });
});
