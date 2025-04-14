import regexp from '../src/lib/regexp';
import { expect } from 'chai';

const testString = `
// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import 'hardhat/console.sol';
import'hardhat/console.sol';
import "hardhat/console.sol";
import
'hardhat/console.sol'
;

abstract contract Token is ERC20 {
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

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

abstract contract Token is ERC20 {
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
  it('remove console.log imports', () => {
    expect(testString.replace(regexp.imports, '')).not.to.include(
      'console.sol',
    );
  });

  it('remove console.log calls', () => {
    expect(testString.replace(regexp.calls, '')).not.to.include('console.log');
  });

  it('leave unrelated code intact', () => {
    const output = testString
      .replace(regexp.imports, '')
      .replace(regexp.calls, '');

    expect(output).to.equal(expectedOutput);
  });
});
