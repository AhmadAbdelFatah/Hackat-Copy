// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title PolicyManager
/// @author Mostafa
/// @notice Manages insurance policies, allowing farmers to subscribe and receive payouts.
/// @dev This contract assumes equal payout distribution and is intended for demonstration.

contract PolicyManager {
    /// @notice Enum representing the state of a policy.
    enum PolicyStatus { Active, Paused, Triggered }

    /// @notice Represents a policy with threshold, premium, and subscribers.
    struct Policy {
        uint256 id;
        uint256 threshold;
        uint256 premium;
        PolicyStatus status;
        address[] subscribers;
    }

    /// @notice Contract owner (initial deployer).
    address public owner;

    /// @notice Tracks the next policy ID to be assigned.
    uint256 public nextPolicyId = 1;

    /// @notice Maps policy ID to policy data.
    mapping(uint256 => Policy) public policies;

    /// @notice Maps farmer address to list of policy IDs they subscribed to.
    mapping(address => uint256[]) public farmerPolicies;

    /// @notice Emitted when a new policy is created.
    event PolicyCreated(uint256 indexed id, uint256 threshold, uint256 premium);

    /// @notice Emitted when a farmer subscribes to a policy.
    event Subscribed(address indexed farmer, uint256 indexed policyId);

    /// @notice Emitted when payout is triggered for a policy.
    event PayoutTriggered(uint256 indexed policyId);

    /// @notice Emitted when a policy status is changed (paused or resumed).
    event PolicyStatusChanged(uint256 indexed policyId, PolicyStatus newStatus);

    /// @notice Restricts function access to the contract owner.
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    /// @notice Ensures the policy with the given ID exists.
    /// @param _id The ID of the policy to validate.
    modifier validPolicy(uint256 _id) {
        require(policies[_id].id != 0, "Policy does not exist");
        _;
    }

    /// @notice Initializes the contract and sets the deployer as the owner.
    constructor() {
        owner = msg.sender;
    }

    /// @notice Creates a new policy with given threshold and premium.
    /// @param _threshold The trigger threshold for the policy.
    /// @param _premium The premium amount required to subscribe.
    function createPolicy(uint256 _threshold, uint256 _premium) external onlyOwner {
        Policy storage p = policies[nextPolicyId];
        p.id = nextPolicyId;
        p.threshold = _threshold;
        p.premium = _premium;
        p.status = PolicyStatus.Active;

        emit PolicyCreated(nextPolicyId, _threshold, _premium);
        nextPolicyId++;
    }

    /// @notice Allows a user to subscribe to an active policy by paying the exact premium.
    /// @param _policyId The ID of the policy to subscribe to.
    function subscribe(uint256 _policyId) external payable validPolicy(_policyId) {
        Policy storage p = policies[_policyId];
        require(p.status == PolicyStatus.Active, "Policy is not active");
        require(msg.value == p.premium, "Incorrect premium amount");

        p.subscribers.push(msg.sender);
        farmerPolicies[msg.sender].push(_policyId);

        emit Subscribed(msg.sender, _policyId);
    }

    /// @notice Triggers payout for a policy and distributes available balance equally among subscribers.
    /// @param _policyId The ID of the policy for which payout is being triggered.
    function triggerPayout(uint256 _policyId) external onlyOwner validPolicy(_policyId) {
        Policy storage p = policies[_policyId];
        require(p.status == PolicyStatus.Active, "Policy not active");

        uint256 payoutAmount = address(this).balance / p.subscribers.length;
        for (uint i = 0; i < p.subscribers.length; i++) {
            payable(p.subscribers[i]).transfer(payoutAmount);
        }

        p.status = PolicyStatus.Triggered;
        emit PayoutTriggered(_policyId);
    }
    /// @notice Pauses a policy, preventing further subscriptions.
    /// @param _policyId The ID of the policy to pause.
    function pausePolicy(uint256 _policyId) external onlyOwner validPolicy(_policyId) {
        policies[_policyId].status = PolicyStatus.Paused;
        emit PolicyStatusChanged(_policyId, PolicyStatus.Paused);
    }

    /// @notice Resumes a paused policy.
    /// @param _policyId The ID of the policy to resume.
    function resumePolicy(uint256 _policyId) external onlyOwner validPolicy(_policyId) {
        policies[_policyId].status = PolicyStatus.Active;
        emit PolicyStatusChanged(_policyId, PolicyStatus.Active);
    }

    /// @notice Returns the details of a policy.
    /// @param _policyId The ID of the policy to query.
    /// @return threshold The trigger threshold
    /// @return premium The premium amount
    /// @return status The current status of the policy
    /// @return subscriberCount Number of subscribers
    function getPolicyDetails(uint256 _policyId) external view validPolicy(_policyId)
        returns (uint256 threshold, uint256 premium, PolicyStatus status, uint256 subscriberCount)
    {
        Policy storage p = policies[_policyId];
        return (p.threshold, p.premium, p.status, p.subscribers.length);
    }

    /// @notice Allows the contract to receive Ether from farmers or the owner.
    receive() external payable {}
}