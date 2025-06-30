// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {PolicyManager} from "../src/PolicyManager.sol";

contract TestPolicyManager is Test {
    uint256 PREMIMUM_VAL = 0.01 ether;
    address treasury;
    PolicyManager policyManager;

    /// @notice use createPolicy modifier instead of writing it in each test
    modifier createPolicy() {
        policyManager.createPolicy(
            "Test Policy", // name
            50, // threshold
            PREMIMUM_VAL, // premium
            2025, // season
            block.timestamp, // season start
            block.timestamp + 30 days, // season end
            block.timestamp + 7 days, // subscription deadline
            true // full season coverage
        );

        _;
    }

    function setUp() public {
        treasury = address(0x123);
        policyManager = new PolicyManager(treasury);
        vm.deal(address(this), 1 ether); // fund the contract
    }

    /////////////////////////////////////////
    /// @notice setPayoutEngine function
    /////////////////////////////////////////
    function testSetPayoutEngine() public {
        address payoutEngine = address(0x456);
        policyManager.setPayoutEngine(payoutEngine);

        assertEq(
            policyManager.payoutEngine(),
            payoutEngine,
            "PayoutEngine is incorrect"
        );
    }

    function testSetPayoutEngineRevertsIfNotOwner() public {
        vm.prank(address(0x123)); // Simulate another user
        vm.expectRevert("Only owner can call this");
        policyManager.setPayoutEngine(address(0x456));
    }

    /////////////////////////////////////////
    /// @notice createPolicy function
    /////////////////////////////////////////
    function testCreatePolicy() public createPolicy {
        (
            string memory name,
            ,
            uint256 premium,
            ,
            ,
            ,
            ,
            ,
            bool coversFullSeason,
            uint256 subscriberCount
        ) = policyManager.getPolicyDetails(1);

        assertEq(name, "Test Policy", "Policy name is incorrect");
        assertEq(premium, PREMIMUM_VAL, "Policy premium is incorrect");
        assertEq(subscriberCount, 0, "Policy subscribers Count is incorrect");
        assertTrue(coversFullSeason, "Policy coverage type is incorrect");
    }

    /////////////////////////////////////////
    /// @notice subscribe function
    /////////////////////////////////////////
    function testSubscribeSuccess() public createPolicy {
        policyManager.subscribe{value: PREMIMUM_VAL}(1);
        (, , , , , , , , , uint256 subscriberCount) = policyManager
            .getPolicyDetails(1);

        assertEq(subscriberCount, 1, "Subscriber count is incorrect");
    }

    /// @notice reverts when trying to subscribe to a non-existent policy
    function testSubscribeRevertsForNonExistentPolicy() public {
        vm.expectRevert("Policy does not exist");
        policyManager.subscribe{value: PREMIMUM_VAL}(1); // Policy ID 1 doesn't exist
    }

    /// @notice reverts if the policy is paused or marked for payout
    function testSubscribeRevertsIfPolicyNotActive() public createPolicy {
        policyManager.pausePolicy(1); // Pause the policy
        vm.expectRevert("Policy is not active");
        policyManager.subscribe{value: PREMIMUM_VAL}(1);
    }

    /// @notice reverts if the subscription deadline has passed
    function testSubscribeRevertsIfDeadlinePassed() public {
        policyManager.createPolicy(
            "Test Policy",
            50,
            PREMIMUM_VAL,
            2025,
            block.timestamp,
            block.timestamp + 30 days,
            block.timestamp - 1, // Subscription deadline in the past
            true
        );

        vm.expectRevert("Subscription deadline passed");
        policyManager.subscribe{value: PREMIMUM_VAL}(1);
    }

    /// @notice reverts when the sent ETH value is not equal to the required premium
    function testSubscribeRevertsForIncorrectPremium() public createPolicy {
        vm.expectRevert("Incorrect premium amount");
        policyManager.subscribe{value: 0.001 ether}(1); // Sending less than required premium
    }

    /// @notice reverts if the farmer has already subscribed to the same policy in the same season
    function testSubscribeRevertsForDuplicateSubscription()
        public
        createPolicy
    {
        policyManager.subscribe{value: PREMIMUM_VAL}(1); // First subscription

        vm.expectRevert("Already subscribed to this policy this season");
        policyManager.subscribe{value: PREMIMUM_VAL}(1); // Second subscription in the same season
    }

    /// @notice reverts if a farmer tries to subscribe to multiple full-season policies in the same season
    function testSubscribeRevertsForOverlappingFullSeason() public {
        policyManager.createPolicy(
            "Full Season Policy 1",
            50,
            PREMIMUM_VAL,
            2025,
            block.timestamp,
            block.timestamp + 30 days,
            block.timestamp + 7 days,
            true // Full season coverage
        );

        policyManager.createPolicy(
            "Full Season Policy 2",
            50,
            PREMIMUM_VAL,
            2025,
            block.timestamp,
            block.timestamp + 30 days,
            block.timestamp + 7 days,
            true // Full season coverage
        );

        policyManager.subscribe{value: PREMIMUM_VAL}(1); // Subscribe to the first full-season policy

        vm.expectRevert("Already subscribed to another policy this season");
        policyManager.subscribe{value: PREMIMUM_VAL}(2); // Attempt to subscribe to the second full-season policy
    }

    /// @notice reverts if a farmer tries to subscribe to a sub-policy after already subscribing to a full-season policy
    function testSubscribeRevertsForSubPolicyAfterFullSeason() public {
        policyManager.createPolicy(
            "Full Season Policy",
            50,
            PREMIMUM_VAL,
            2025,
            block.timestamp,
            block.timestamp + 30 days,
            block.timestamp + 7 days,
            true // Full season coverage
        );

        policyManager.createPolicy(
            "Sub Policy",
            50,
            PREMIMUM_VAL,
            2025,
            block.timestamp,
            block.timestamp + 30 days,
            block.timestamp + 7 days,
            false // Sub-policy coverage
        );

        policyManager.subscribe{value: PREMIMUM_VAL}(1); // Subscribe to the full-season policy

        vm.expectRevert("Cannot subscribe to sub-policy after full-season");
        policyManager.subscribe{value: PREMIMUM_VAL}(2); // Attempt to subscribe to the sub-policy
    }

    /// @notice test the Subscribed event is emitted on successful subscription
    function testSubscribeEmitsEvent() public createPolicy {
        vm.expectEmit(true, true, true, true);
        emit PolicyManager.Subscribed(address(this), 1, 2025); // Expected event
        policyManager.subscribe{value: PREMIMUM_VAL}(1);
    }

    /// @notice Ensure that a farmer's subscription is successfully recorded in their policy list.
    function testSubscribeUpdatesFarmerPolicies() public createPolicy {
        policyManager.subscribe{value: PREMIMUM_VAL}(1); // Subscribe to the policy

        // get subscriptions list
        PolicyManager.Subscription[] memory subscriptions = policyManager
            .getFarmerPolicies(address(this), 2025);

        assertEq(
            subscriptions.length,
            1,
            "Farmer policy subscription not recorded correctly"
        );
        assertEq(
            subscriptions[0].policyId,
            1,
            "Incorrect policy ID in subscription record"
        );
    }

    /////////////////////////////////////////
    /// @notice markPolicyAsPayout function
    /////////////////////////////////////////
    function testMarkPolicyAsPayout() public createPolicy {
        policyManager.setPayoutEngine(address(this));
        policyManager.markPolicyAsPayout(1);

        (, , , PolicyManager.PolicyStatus status, , , , , , ) = policyManager
            .getPolicyDetails(1);

        assertEq(
            uint256(status),
            uint256(PolicyManager.PolicyStatus.PayoutTriggered),
            "Policy status is incorrect"
        );
    }

    /////////////////////////////////////////
    /// @notice pausePolicy function
    /////////////////////////////////////////
    function testPausePolicy() public createPolicy {
        policyManager.pausePolicy(1);

        (, , , PolicyManager.PolicyStatus status, , , , , , ) = policyManager
            .getPolicyDetails(1);

        assertEq(
            uint256(status),
            uint256(PolicyManager.PolicyStatus.Paused),
            "Policy status is incorrect"
        );
    }

    /////////////////////////////////////////
    /// @notice resumePolicy function
    /////////////////////////////////////////
    function testResumePolicy() public createPolicy {
        policyManager.pausePolicy(1);
        policyManager.resumePolicy(1);

        (, , , PolicyManager.PolicyStatus status, , , , , , ) = policyManager
            .getPolicyDetails(1);

        assertEq(
            uint256(status),
            uint256(PolicyManager.PolicyStatus.Active),
            "Policy status is incorrect"
        );
    }

    /////////////////////////////////////////
    /// @notice resetSeasonState function
    /////////////////////////////////////////
    function testResetSeasonState() public createPolicy {
        policyManager.pausePolicy(1);
        policyManager.resetSeasonState(1);

        (, , , , uint256 season, , , , , ) = policyManager.getPolicyDetails(1);
        assertEq(season, 2026, "Policy season did not reset correctly");
    }

    /////////////////////////////////////////
    /// @notice getFarmerPolicies function
    /////////////////////////////////////////
    function testGetFarmerPolicies() public createPolicy {
        policyManager.subscribe{value: PREMIMUM_VAL}(1);

        uint256 policiesLength = policyManager
            .getFarmerPolicies(address(this), 2025)
            .length;
        assertEq(policiesLength, 1, "Farmer policies length mismatch");
    }

    /////////////////////////////////////////
    /// @notice getHistoricalSubscribers function
    /////////////////////////////////////////
    function testGetHistoricalSubscribers() public createPolicy {
        policyManager.subscribe{value: PREMIMUM_VAL}(1);

        policyManager.pausePolicy(1);
        policyManager.resetSeasonState(1);

        address[] memory historical = policyManager.getHistoricalSubscribers(
            1,
            2025
        );
        assertEq(historical.length, 1, "Historical subscribers mismatch");
    }
}
