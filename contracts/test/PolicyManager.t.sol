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
    }

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

    function testSubscribe() public createPolicy {
        vm.deal(address(this), 2 ether); // Fund the test contract
        policyManager.subscribe{value: PREMIMUM_VAL}(1);
        (, , , , , , , , , uint256 subscriberCount) = policyManager
            .getPolicyDetails(1);

        assertEq(subscriberCount, 1, "Subscriber count is incorrect");
    }

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

    function testResetSeasonState() public createPolicy {
        policyManager.pausePolicy(1);
        policyManager.resetSeasonState(1);

        (, , , , uint256 season, , , , , ) = policyManager.getPolicyDetails(1);
        assertEq(season, 2026, "Policy season did not reset correctly");
    }

    function testGetFarmerPolicies() public createPolicy {
        vm.deal(address(this), 1 ether);
        policyManager.subscribe{value: PREMIMUM_VAL}(1);

        uint256 policiesLength = policyManager
            .getFarmerPolicies(address(this), 2025)
            .length;
        assertEq(policiesLength, 1, "Farmer policies length mismatch");
    }

    function testGetHistoricalSubscribers() public createPolicy {
        vm.deal(address(this), 1 ether);
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
