import pkg from '../package.json';
import taskRemoveLogs from './tasks/remove_logs.js';
import { HardhatPlugin } from 'hardhat/types/plugins';

const plugin: HardhatPlugin = {
  id: pkg.name!,
  npmPackage: pkg.name!,
  tasks: [taskRemoveLogs],
};

export default plugin;
