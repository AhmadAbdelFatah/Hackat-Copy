// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

/// @title Treasury
/// @author AhmadAbdelFattah
/// @notice This contract acts as a secure vault for storing collected insurance premiums.

contract Treasury is Ownable, ReentrancyGuard {
    /// @notice Emitted when a deposit is made into the treasury.
    /// @param manager The address of the authorized manager contract that triggered the deposit.
    /// @param farmer The farmer’s wallet address associated with the deposit.
    /// @param amount The amount of ETH deposited.
    event Deposit(address indexed manager, address indexed farmer, uint256 amount);

    /// @notice Emitted when the owner withdraws funds from the treasury.
    /// @param to The address receiving the withdrawn funds.
    /// @param amount The amount of ETH withdrawn.
    event Withdraw(address indexed to, uint256 amount);

    /// @notice Emitted when the owner updates manager authorization.
    /// @param manager The manager contract being updated.
    /// @param enabled Whether the manager is authorized (`true`) or revoked (`false`).
    event ManagerUpdated(address indexed manager, bool enabled);

    /// @notice Mapping of authorized manager contracts.
    /// @dev Only managers with `true` can interact with deposit functions.
    mapping(address => bool) public authorizedManagers;

    /// @notice Records ETH balances deposited on behalf of each farmer.
    mapping(address => uint256) public farmerBalances;

    /// @notice Tracks the total ETH collected by the treasury.
    /// @dev Useful for analytics, though the actual balance can also be checked with `address(this).balance`.
    uint256 public totalCollected;

    /// @notice Restricts access to authorized manager contracts only.
    modifier onlyAuthorizedManager() {
        require(authorizedManagers[msg.sender], "Treasury: not authorized manager");
        _;
    }

    constructor() Ownable(msg.sender) {}


    /// @notice Allows the owner to add or remove authorized manager contracts.
    /// @param _manager The address of the manager contract to update.
    /// @param _enabled Set to `true` to authorize, `false` to revoke.
    function setManager(address _manager, bool _enabled) external onlyOwner {
        require(_manager != address(0), "Treasury: zero address");
        authorizedManagers[_manager] = _enabled;
        emit ManagerUpdated(_manager, _enabled);
    }


    /// @notice Deposits ETH on behalf of a farmer into the treasury.
    /// @dev Only callable by an authorized manager (e.g., PolicyManager).
    /// @param farmer The address of the farmer for whom the deposit is made.
    function deposit(address farmer) external payable onlyAuthorizedManager {
        require(msg.value > 0, "Treasury: zero deposit");

        farmerBalances[farmer] += msg.value;
        totalCollected += msg.value;

        emit Deposit(msg.sender, farmer, msg.value);
    }


    /// @notice Allows the owner to withdraw a specific amount of ETH.
    /// @dev Uses `nonReentrant` to prevent reentrancy attacks during external calls.
    /// @param to The recipient address of the withdrawal.
    /// @param amount The amount of ETH to withdraw.
    function withdraw(address payable to, uint256 amount) external onlyOwner nonReentrant {
        require(to != address(0), "Treasury: zero address");
        require(address(this).balance >= amount, "Treasury: insufficient balance");

        (bool success, ) = to.call{value: amount}("");
        require(success, "Treasury: transfer failed");

        emit Withdraw(to, amount);
    }

    /// @notice Allows the owner to withdraw all ETH from the treasury.
    /// @dev Uses `nonReentrant` for safety against reentrancy.
    /// @param to The recipient address of the withdrawal.
    function withdrawAll(address payable to) external onlyOwner nonReentrant {
        uint256 bal = address(this).balance;
        require(bal > 0, "Treasury: zero balance");

        (bool success, ) = to.call{value: bal}("");
        require(success, "Treasury: transfer failed");

        emit Withdraw(to, bal);
    }


    /// @notice Returns the total ETH balance currently held by the treasury.
    /// @return The ETH balance of the treasury contract.
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
