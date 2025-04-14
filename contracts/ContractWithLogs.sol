// SPDX-License-Identifier: MIT
pragma solidity *;

import 'hardhat/console.sol';

contract ContractWithLogs {
    function fn() external view {
        console.log('log1');
        console.log('log2');
    }
}
