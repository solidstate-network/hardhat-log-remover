// SPDX-License-Identifier: MIT
pragma solidity *;

import 'hardhat/console.sol';

contract ContractWithLogs {
    function fn() external pure {
        console.log('log1');
        console.log('log2');
    }
}
