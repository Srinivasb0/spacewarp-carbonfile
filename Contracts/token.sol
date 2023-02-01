// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CarbonFileToken is ERC20, Ownable {
    constructor() ERC20("Carbon File token", "CFTK") {}
    uint256 public tokenCount = 0;
    uint256 public maxSupply = 10;
    uint256 amount = 1; // amount in Math.pow(10, 18)


    function mint() public payable {
        require(tokenCount <= maxSupply, "token limit reached");
        _mint(msg.sender, amount);
        tokenCount += 1;
    }

    function burn() public onlyOwner {
        _burn(msg.sender, amount);
        tokenCount -= 1;
    }
}