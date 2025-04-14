import HardhatLogRemover from './src/index.js';
import type { HardhatUserConfig } from 'hardhat/config';

const config: HardhatUserConfig = {
  plugins: [HardhatLogRemover],
};

export default config;
