// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title PolicyManager
/// @author Youssef
/// @notice Manages seasonal crop insurance policies with premium forwarding to a Treasury contract.

/// @notice Interface to interact with the Treasury contract
interface ITreasury {
    /// @notice Deposits the premium on behalf of the farmer
    /// @param farmer Address of the farmer making the deposit
    function deposit(address farmer) external payable;
}

contract PolicyManager {
    /// @notice Enum representing the status of a policy
    enum PolicyStatus { Active, Paused, PayoutTriggered }

    /// @notice Struct holding all data related to a policy
    struct Policy {
        uint256 id;                               ///< Unique identifier for the policy
        string name;                              ///< Policy name (e.g., "Grain Filling Stage")
        uint256 triggerThreshold;                 ///< Threshold value to trigger payout
        uint256 premium;                          ///< Required premium to subscribe
        uint256 season;                           ///< Current season of the policy
        uint256 seasonStart;                      ///< Timestamp marking start of the season
        uint256 seasonEnd;                        ///< Timestamp marking end of the season
        uint256 subscriptionDeadline;             ///< Timestamp after which subscription is not allowed
        bool coversFullSeason;                    ///< Indicates full-season or sub-season coverage
        PolicyStatus status;                      ///< Current status of the policy
        address[] currentSubscribers;             ///< List of addresses currently subscribed
        mapping(address => uint256) lastSubscribedSeason; ///< Last season a farmer subscribed
    }

    /// @notice Address of the contract owner
    address public owner;

    /// @notice Address of the Treasury contract handling premium deposits
    address public treasury;

    /// @notice Tracks the next policy ID to be assigned
    uint256 public nextPolicyId = 1;

    /// @notice Mapping of policy ID to policy data
    mapping(uint256 => Policy) private policies;

    /// @notice Tracks policies each farmer subscribed to
    mapping(address => uint256[]) public farmerPolicies;

    /// @notice Mapping to prevent multiple full-season policy subscriptions per farmer per season
    mapping(address => mapping(uint256 => bool)) public farmerSeasonFullCover;

    /// @notice Emitted when a new policy is created
    event PolicyCreated(uint256 indexed id, string name, uint256 season);

    /// @notice Emitted when a farmer subscribes to a policy
    event Subscribed(address indexed farmer, uint256 indexed policyId, uint256 season);

    /// @notice Ensures only the contract owner can call certain functions
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    /// @notice Validates that a policy exists
    /// @param _id The ID of the policy
    modifier validPolicy(uint256 _id) {
        require(_id > 0 && _id < nextPolicyId, "Policy does not exist");
        _;
    }

    /// @notice Initializes the contract and sets the treasury address
    /// @param _treasury Address of the Treasury contract
    constructor(address _treasury) {
        owner = msg.sender;
        treasury = _treasury;
    }

    /// @notice Creates a new insurance policy
    /// @param _name Name of the policy
    /// @param _threshold Threshold value to trigger payout
    /// @param _premium Premium amount required to subscribe
    /// @param _season Season index (e.g. year)
    /// @param _seasonStart Season start timestamp
    /// @param _seasonEnd Season end timestamp
    /// @param _subscriptionDeadline Last timestamp to allow subscriptions
    /// @param _coversFullSeason Whether the policy covers the full season
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

    /// @notice Subscribes a farmer to a policy and forwards the premium to the Treasury
    /// @param _policyId ID of the policy to subscribe to
    function subscribe(uint256 _policyId) external payable validPolicy(_policyId) {
        Policy storage p = policies[_policyId];

        require(p.status == PolicyStatus.Active, "Policy is not active");
        require(block.timestamp <= p.subscriptionDeadline, "Subscription deadline passed");
        require(msg.value == p.premium, "Incorrect premium amount");
        require(p.lastSubscribedSeason[msg.sender] < p.season, "Already subscribed this season");

        if (p.coversFullSeason) {
            require(!farmerSeasonFullCover[msg.sender][p.season], "Already subscribed to full-season policy");
            farmerSeasonFullCover[msg.sender][p.season] = true;
        } else {
            require(!farmerSeasonFullCover[msg.sender][p.season], "Full-season policy already subscribed");
        }

        p.lastSubscribedSeason[msg.sender] = p.season;
        p.currentSubscribers.push(msg.sender);
        farmerPolicies[msg.sender].push(_policyId);

        /// @dev Treasury contract handles actual storage of ETH
        ITreasury(treasury).deposit{value: msg.value}(msg.sender);

        emit Subscribed(msg.sender, _policyId, p.season);
    }
}
