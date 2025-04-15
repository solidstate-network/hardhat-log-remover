import pkg from '../../package.json';
import { removeLogs } from '../lib/log_remover.js';
import { HardhatPluginError } from 'hardhat/plugins';
import { NewTaskActionFunction } from 'hardhat/types/tasks';

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

  await removeLogs(sourcePaths);
};

export default action;
