// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title PolicyManager
/// @author Youssef
/// @notice Manages seasonal crop insurance policies with season timing and subscription deadlines.
/// @dev This version includes support for seasons but excludes treasury, full-coverage logic, and external payout engine.

contract PolicyManager {
    /// @notice Enum representing the current status of a policy.
    enum PolicyStatus { Active, Paused, PayoutTriggered }

    /// @notice Represents an insurance policy for a specific season.
    struct Policy {
        uint256 id;                         ///< Unique ID of the policy.
        string name;                        ///< Descriptive name of the policy (e.g. "Grain Filling Stage").
        uint256 triggerThreshold;           ///< Threshold value that triggers payout.
        uint256 premium;                    ///< Subscription fee required from farmer.
        uint256 season;                     ///< Season index (e.g. year or cycle).
        uint256 seasonStart;                ///< Unix timestamp marking the start of the season.
        uint256 seasonEnd;                  ///< Unix timestamp marking the end of the season.
        uint256 subscriptionDeadline;       ///< Latest time when farmers can subscribe.
        PolicyStatus status;                ///< Current status of the policy.
        address[] currentSubscribers;       ///< List of farmers subscribed this season.
        mapping(address => uint256) lastSubscribedSeason; ///< Last season a farmer subscribed to this policy.
    }

    /// @notice Address of the contract owner (deployer).
    address public owner;

    /// @notice Auto-incrementing counter for assigning new policy IDs.
    uint256 public nextPolicyId = 1;

    /// @notice Maps a policy ID to its corresponding policy struct.
    mapping(uint256 => Policy) private policies;

    /// @notice Tracks all policy IDs that a given farmer has subscribed to.
    mapping(address => uint256[]) public farmerPolicies;

    /// @notice Emitted when a new policy is created.
    event PolicyCreated(uint256 indexed id, string name, uint256 season);

    /// @notice Emitted when a farmer subscribes to a policy.
    event Subscribed(address indexed farmer, uint256 indexed policyId, uint256 season);

    /// @notice Emitted when payout is triggered for a policy.
    event PayoutTriggered(uint256 indexed policyId);

    /// @notice Emitted when the policy status is changed.
    event PolicyStatusChanged(uint256 indexed policyId, PolicyStatus newStatus);

    /// @notice Restricts access to the contract owner only.
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    /// @notice Ensures that a policy exists for the given ID.
    /// @param _id The ID of the policy to check.
    modifier validPolicy(uint256 _id) {
        require(_id > 0 && _id < nextPolicyId, "Policy does not exist");
        _;
    }

    /// @notice Initializes the contract and sets the owner.
    constructor() {
        owner = msg.sender;
    }

    /// @notice Creates a new insurance policy with seasonal parameters.
    /// @param _name Name of the policy (e.g. "Flood Risk").
    /// @param _threshold Value at which the payout is triggered.
    /// @param _premium Required subscription fee.
    /// @param _season Identifier of the season.
    /// @param _seasonStart Start time of the season (timestamp).
    /// @param _seasonEnd End time of the season (timestamp).
    /// @param _subscriptionDeadline Deadline for subscribing to this policy.
    function createPolicy(
        string memory _name,
        uint256 _threshold,
        uint256 _premium,
        uint256 _season,
        uint256 _seasonStart,
        uint256 _seasonEnd,
        uint256 _subscriptionDeadline
    ) external onlyOwner {
        Policy storage p = policies[nextPolicyId];
        p.id = nextPolicyId;
        p.name = _name;
        p.triggerThreshold = _threshold;
        p.premium = _premium;
        p.season = _season;
        p.seasonStart = _seasonStart;
        p.seasonEnd = _seasonEnd;
        p.subscriptionDeadline = _subscriptionDeadline;
        p.status = PolicyStatus.Active;

        emit PolicyCreated(nextPolicyId, _name, _season);
        nextPolicyId++;
    }

    /// @notice Allows a farmer to subscribe to an active policy.
    /// @param _policyId ID of the policy to subscribe to.
    function subscribe(uint256 _policyId) external payable validPolicy(_policyId) {
        Policy storage p = policies[_policyId];

        require(p.status == PolicyStatus.Active, "Policy is not active");
        require(block.timestamp <= p.subscriptionDeadline, "Subscription deadline passed");
        require(msg.value == p.premium, "Incorrect premium amount");
        require(p.lastSubscribedSeason[msg.sender] < p.season, "Already subscribed this season");

        p.lastSubscribedSeason[msg.sender] = p.season;
        p.currentSubscribers.push(msg.sender);
        farmerPolicies[msg.sender].push(_policyId);

        emit Subscribed(msg.sender, _policyId, p.season);
    }

    /// @notice Triggers a payout manually by the owner.
    /// @param _policyId ID of the policy to trigger payout for.
    function markPolicyAsPayout(uint256 _policyId) external onlyOwner validPolicy(_policyId) {
        Policy storage p = policies[_policyId];
        require(p.status == PolicyStatus.Active, "Policy not active");
        p.status = PolicyStatus.PayoutTriggered;

        emit PolicyStatusChanged(_policyId, PolicyStatus.PayoutTriggered);
        emit PayoutTriggered(_policyId);
    }

    /// @notice Pauses a currently active policy.
    /// @param _policyId ID of the policy to pause.
    function pausePolicy(uint256 _policyId) external onlyOwner validPolicy(_policyId) {
        policies[_policyId].status = PolicyStatus.Paused;
        emit PolicyStatusChanged(_policyId, PolicyStatus.Paused);
    }

    /// @notice Resumes a paused policy.
    /// @param _policyId ID of the policy to resume.
    function resumePolicy(uint256 _policyId) external onlyOwner validPolicy(_policyId) {
        policies[_policyId].status = PolicyStatus.Active;
        emit PolicyStatusChanged(_policyId, PolicyStatus.Active);
    }

    /// @notice Fetches the full details of a policy.
    /// @param _policyId ID of the policy to retrieve.
    /// @return name Name of the policy.
    /// @return threshold Trigger threshold for payout.
    /// @return premium Required premium.
    /// @return status Current status of the policy.
    /// @return season Season index.
    /// @return seasonStart Season start time.
    /// @return seasonEnd Season end time.
    /// @return subscriptionDeadline Final time to subscribe.
    /// @return subscriberCount Number of subscribers this season.
    function getPolicyDetails(uint256 _policyId)
        external
        view
        validPolicy(_policyId)
        returns (
            string memory name,
            uint256 threshold,
            uint256 premium,
            PolicyStatus status,
            uint256 season,
            uint256 seasonStart,
            uint256 seasonEnd,
            uint256 subscriptionDeadline,
            uint256 subscriberCount
        )
    {
        Policy storage p = policies[_policyId];
        return (
            p.name,
            p.triggerThreshold,
            p.premium,
            p.status,
            p.season,
            p.seasonStart,
            p.seasonEnd,
            p.subscriptionDeadline,
            p.currentSubscribers.length
        );
    }

    /// @notice Returns all policy IDs that a farmer has subscribed to.
    /// @param _farmer The address of the farmer.
    /// @return Array of policy IDs.
    function getFarmerPolicies(address _farmer) external view returns (uint256[] memory) {
        return farmerPolicies[_farmer];
    }

    /// @notice Allows contract to receive ETH payments.
    receive() external payable {}
}
