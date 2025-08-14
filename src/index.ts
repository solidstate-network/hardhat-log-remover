import pkg from '../package.json' with { type: 'json' };
import taskRemoveLogs from './tasks/remove_logs.js';
import { HardhatPlugin } from 'hardhat/types/plugins';

const plugin: HardhatPlugin = {
  id: pkg.name!,
  npmPackage: pkg.name!,
  dependencies: () => [import('@solidstate/hardhat-solidstate-utils')],
  tasks: [taskRemoveLogs],
};

export default plugin;
