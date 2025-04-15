import regexp from '../src/lib/regexp.js';
import assert from 'node:assert';
import { describe, it } from 'node:test';

const testString = `
// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import { IERC20 } from '@solidstate/contracts/interfaces/IERC20.sol';
import 'hardhat/console.sol';
import'hardhat/console.sol';
import "hardhat/console.sol";
import
'hardhat/console.sol'
;

abstract contract Token is IERC20 {
  uint private _n;

  function runAction () external {
    _n++;

    console.log(_n);
    console.log(
      _n
    );

    _n--;
    console.log(_n, 'n');

    console.logInt(1);
    // console.log(_n, 'n');

    console.logBytes27(
      '0x');

    if (_n == 0) { console.log(_n); }
    if (_n == 0) console.log(_n);
  }
}
`;

const expectedOutput = `
// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import { IERC20 } from '@solidstate/contracts/interfaces/IERC20.sol';

abstract contract Token is IERC20 {
  uint private _n;

  function runAction () external {
    _n++;

    _n--;

    if (_n == 0) { }
    if (_n == 0)
  }
}
`;

describe('regular expressions', () => {
  it('remove console.sol imports', () => {
    assert.match(testString, /console\.sol/);
    assert.match(testString.replace(regexp.imports, ''), /console\.log/);
    assert.doesNotMatch(testString.replace(regexp.imports, ''), /console\.sol/);
  });

  it('remove console.log calls', () => {
    assert.match(testString, /console\.log/);
    assert.match(testString.replace(regexp.calls, ''), /console\.sol/);
    assert.doesNotMatch(testString.replace(regexp.calls, ''), /console\.log/);
  });

  it('leave unrelated code intact', () => {
    const output = testString
      .replace(regexp.imports, '')
      .replace(regexp.calls, '');

    assert.equal(output, expectedOutput);
  });
});
