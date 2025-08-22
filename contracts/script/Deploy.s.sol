// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/PolicyManager.sol";
import "../src/Treasury.sol";

contract Deploy is Script {
    function run() external {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(privateKey);
        
        Treasury treasury = new Treasury();
        PolicyManager policy = new PolicyManager(address(treasury));
        
        console2.log("Treasury deployed at:", address(treasury));
        console2.log("PolicyManager deployed at:", address(policy));
        
        vm.stopBroadcast();
    }
}