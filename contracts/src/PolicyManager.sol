// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title PolicyManager
/// @author Youssef
/// @notice Manages seasonal crop insurance policies with full-season and partial coverage.

interface ITreasury {
/// @notice Function to deposit funds from a farmer to the treasury
/// @param farmer Address of the subscribing farmer
function deposit(address farmer) external payable;
}

contract PolicyManager {
    /// @notice Enum representing the status of a policy
    enum PolicyStatus { Active, Paused, PayoutTriggered }

    /// @notice Struct containing all relevant policy data
    struct Policy {
        uint256 id;                               // Unique policy identifier
        string name;                              // Name of the policy, e.g., "Grain Filling Stage"
        uint256 triggerThreshold;                 // Threshold to trigger payout
        uint256 premium;                          // Subscription fee
        uint256 season;                           // Season index (e.g., year or cycle)
        uint256 seasonStart;                      // Timestamp marking start of season
        uint256 seasonEnd;                        // Timestamp marking end of season
        uint256 subscriptionDeadline;             // Timestamp beyond which subscription is not allowed
        bool coversFullSeason;                    // Indicates full or partial season coverage
        PolicyStatus status;                      // Current status of the policy
        address[] currentSubscribers;             // List of current policy subscribers
        mapping(address => uint256) lastSubscribedSeason;  // Records last season each address subscribed
    }

    address public owner;                          // Contract owner (deployer)
    address public treasury;                       // Address of Treasury contract
    address public payoutEngine;                   // Address of PayoutEngine contract

    uint256 public nextPolicyId = 1;               // Counter for unique policy IDs

    mapping(uint256 => Policy) private policies;   // Mapping of policyId to Policy data
    mapping(address => uint256[]) public farmerPolicies; // Tracks policies each farmer subscribed to
    mapping(address => mapping(uint256 => bool)) public farmerSeasonFullCover; // Prevents overlapping full-season coverage

    /// @notice Emitted when a new policy is created
    event PolicyCreated(uint256 indexed id, string name, uint256 season);

    /// @notice Emitted when a farmer subscribes to a policy
    event Subscribed(address indexed farmer, uint256 indexed policyId, uint256 season);

    /// @notice Emitted when a payout is triggered for a policy
    event PayoutTriggered(uint256 indexed policyId);

    /// @notice Emitted when a policy status is changed (paused, resumed, payout)
    event PolicyStatusChanged(uint256 indexed policyId, PolicyStatus newStatus);

    /// @notice Restricts function access to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    /// @notice Validates that a given policy exists
    modifier validPolicy(uint256 _id) {
        require(_id > 0 && _id < nextPolicyId, "Policy does not exist");
        _;
    }

    /// @notice Restricts access to the payout engine contract only
    modifier onlyPayoutEngine() {
        require(msg.sender == payoutEngine, "Only PayoutEngine can call this");
        _;
    }

    /// @notice Contract constructor sets initial treasury address
    /// @param _treasury Address of the treasury contract
    constructor(address _treasury) {
        owner = msg.sender;
        treasury = _treasury;
    }

    /// @notice Sets the payout engine address
    /// @param _payoutEngine Address of the payout engine
    function setPayoutEngine(address _payoutEngine) external onlyOwner {
        payoutEngine = _payoutEngine;
    }

    /// @notice Creates a new insurance policy
    /// @param _name Name of the policy
    /// @param _threshold Payout threshold
    /// @param _premium Premium required to subscribe
    /// @param _season Season index
    /// @param _seasonStart Start timestamp of the season
    /// @param _seasonEnd End timestamp of the season
    /// @param _subscriptionDeadline Last timestamp to allow subscriptions
    /// @param _coversFullSeason Indicates whether full-season is covered
    function createPolicy(
        string memory _name,
        uint256 _threshold,
        uint256 _premium,
        uint256 _season,
        uint256 _seasonStart,
        uint256 _seasonEnd,
        uint256 _subscriptionDeadline,
        bool _coversFullSeason
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
        p.coversFullSeason = _coversFullSeason;
        p.status = PolicyStatus.Active;

        emit PolicyCreated(nextPolicyId, _name, _season);
        nextPolicyId++;
    }

    /// @notice Allows farmers to subscribe to a policy by paying the premium
    /// @param _policyId ID of the policy to subscribe to
    function subscribe(uint256 _policyId) external payable validPolicy(_policyId) {
        Policy storage p = policies[_policyId];

        require(p.status == PolicyStatus.Active, "Policy is not active");
        require(block.timestamp <= p.subscriptionDeadline, "Subscription deadline passed");
        require(msg.value == p.premium, "Incorrect premium amount");
        require(p.lastSubscribedSeason[msg.sender] < p.season, "Already subscribed to this policy this season");

        if (p.coversFullSeason) {
            require(!farmerSeasonFullCover[msg.sender][p.season], "Already subscribed to another policy this season");
            farmerSeasonFullCover[msg.sender][p.season] = true;
        } else {
            require(!farmerSeasonFullCover[msg.sender][p.season], "Cannot subscribe to sub-policy after full-season");
        }

        p.lastSubscribedSeason[msg.sender] = p.season;
        p.currentSubscribers.push(msg.sender);
        farmerPolicies[msg.sender].push(_policyId);

        ITreasury(treasury).deposit{value: msg.value}(msg.sender);

        emit Subscribed(msg.sender, _policyId, p.season);
    }

    /// @notice Marks a policy for payout (called by payout engine)
    /// @param _policyId ID of the policy to mark
    function markPolicyAsPayout(uint256 _policyId) external validPolicy(_policyId) onlyPayoutEngine {
        Policy storage p = policies[_policyId];
        require(p.status == PolicyStatus.Active, "Policy not active");
        p.status = PolicyStatus.PayoutTriggered;
        emit PolicyStatusChanged(_policyId, PolicyStatus.PayoutTriggered);
        emit PayoutTriggered(_policyId);
    }

    /// @notice Pauses an active policy
    /// @param _policyId ID of the policy to pause
    function pausePolicy(uint256 _policyId) external onlyOwner validPolicy(_policyId) {
        policies[_policyId].status = PolicyStatus.Paused;
        emit PolicyStatusChanged(_policyId, PolicyStatus.Paused);
    }

    /// @notice Resumes a paused policy
    /// @param _policyId ID of the policy to resume
    function resumePolicy(uint256 _policyId) external onlyOwner validPolicy(_policyId) {
        policies[_policyId].status = PolicyStatus.Active;
        emit PolicyStatusChanged(_policyId, PolicyStatus.Active);
    }

    /// @notice Resets a policy for the new season
    /// @param _policyId ID of the policy to reset
    function resetPolicyForNewSeason(uint256 _policyId) external onlyOwner validPolicy(_policyId) {
        Policy storage p = policies[_policyId];
        require(
            p.status == PolicyStatus.PayoutTriggered || p.status == PolicyStatus.Paused,
            "Policy must be completed or paused"
        );

        delete p.currentSubscribers;
        p.season += 1;
        p.status = PolicyStatus.Active;

        emit PolicyStatusChanged(_policyId, PolicyStatus.Active);
    }

    /// @notice Returns details of a given policy
    /// @param _policyId ID of the policy to query
    /// @return name Name of the policy
    /// @return threshold Threshold to trigger payout
    /// @return premium Premium required
    /// @return status Current policy status
    /// @return season Season ID
    /// @return seasonStart Season start timestamp
    /// @return seasonEnd Season end timestamp
    /// @return subscriptionDeadline Deadline to subscribe
    /// @return coversFullSeason Whether policy covers full season
    /// @return subscriberCount Number of current subscribers
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
            bool coversFullSeason,
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
            p.coversFullSeason,
            p.currentSubscribers.length
        );
    }

    /// @notice Returns all policy IDs a farmer is subscribed to
    /// @param _farmer Address of the farmer
    function getFarmerPolicies(address _farmer) external view returns (uint256[] memory) {
        return farmerPolicies[_farmer];
    }

    /// @notice Fallback function to receive plain ETH transfers
    receive() external payable {}
    
}