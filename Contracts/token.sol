// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// address : 0x0A8Cf146BDBA5CeA6784E7b68A9B7Ae82065F098s

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CarbonFileToken is ERC20, Ownable {
    constructor() ERC20("Carbon File token", "CFTK") {}
    uint256 public tokenCount = 0;
    uint256 public maxSupply = 10;
    uint256 amount = 1000000000000000000; // amount in Math.pow(10, 18)

    struct tHolder {
    address addr;
    uint amount;
    }
    
    // tHolder[] storage private dao;
    function mint() public payable {
        require(tokenCount <= maxSupply, "token limit reached");
        _mint(msg.sender, amount);
        // dao.push({addr : msg.sender, amount : amount});
        tokenCount += 1;
    }

    function burn() public onlyOwner {
        _burn(msg.sender, amount);
        tokenCount -= 1;
    }
}