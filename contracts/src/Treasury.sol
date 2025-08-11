// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title Treasury Contract
///@notice treasury is an external contract that stores or handles the money being paid in.
/// @dev Emits events when deposits are made and allows querying of contract balance.

contract Treasury {
    /// @notice Emitted when money is deposited into the treasury
    /// @param from The address that sent the money
    /// @param amount The amount of money that was deposited
    event Deposite(address indexed from, uint256 amount);

    /// @notice Accepts money deposits from farmers or other senders
    /// @dev money is sent via `msg.value` and stored in the contract's balance.
    /// @param farmer The address of the farmer or sender (for record purposes only)
    function deposit(address farmer) external payable {
        emit Deposite(farmer, msg.value);
        // Funds are now stored in this contract
    }

    /// @notice Returns the current balance stored in the Treasury
    /// @return The contract's balance 
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}

