import pkg from '../../package.json' with { type: 'json' };
import { removeLogs } from '../lib/log_remover.js';
import { TASK_COMPILE } from '../task_names.js';
import { HardhatPluginError } from 'hardhat/plugins';
import type { NewTaskActionFunction } from 'hardhat/types/tasks';

const action: NewTaskActionFunction = async (args, hre) => {
  try {
    await hre.tasks.getTask(TASK_COMPILE).run();
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
