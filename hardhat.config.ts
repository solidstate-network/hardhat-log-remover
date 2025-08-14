import hardhatLogRemover from './src/index.js';
import type { HardhatUserConfig } from 'hardhat/config';

const config: HardhatUserConfig = {
  plugins: [hardhatLogRemover],
};

export default config;
