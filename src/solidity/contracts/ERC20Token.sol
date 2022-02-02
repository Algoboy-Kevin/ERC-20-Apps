// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.3;

import "./openzepplin/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 {
  constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) {
    _mint(msg.sender, initialSupply);
  }

}