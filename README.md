# Hardhat Log Remover

Remove Hardhat `console.log` imports and calls from Solidity source code.

This plugin is intended in part to keep version-controlled code free of log statements. To remove logs from compiled contracts while preserving them in source code, see [hardhat-preprocessor](https://github.com/wighawag/hardhat-preprocessor).

> Versions of this plugin prior to `3.0.0` were released as `hardhat-log-remover`, outside of the `@solidstate` namespace.

> Versions of this plugin prior to `2.0.0` were released as `buidler-log-remover`.

## Installation

```bash
npm install --save-dev @solidstate/hardhat-log-remover
# or
pnpm add -D @solidstate/hardhat-log-remover
```

## Usage

Load plugin in Hardhat config:

```javascript
import HardhatLogRemover from '@solidstate/hardhat-log-remover';

const config: HardhatUserConfig = {
  plugins: [
    HardhatLogRemover,
  ],
};
```

Run the Hardhat task manually:

```bash
npx hardhat remove-logs
```

# or

```bash
pnpm hardhat remove-logs
```

Before removing logs, the plugin will ensure that all contracts can be compiled successfully.

## Development

Install dependencies via pnpm:

```bash
pnpm install
```

Setup Husky to format code on commit:

```bash
pnpm prepare
```
