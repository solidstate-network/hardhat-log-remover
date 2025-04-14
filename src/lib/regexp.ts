export default {
  imports: /\n?(\s*)?import\s*['"]hardhat\/console.sol['"]\s*;/g,
  calls: /\n?((\s|\/)*)?console\s*\.\s*log\w*\s*\([^;]*\)\s*;/g,
};
