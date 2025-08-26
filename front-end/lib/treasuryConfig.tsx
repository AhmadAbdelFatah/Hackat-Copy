import TreasuryABIJSON from "./TreasuryABI.json";
import {Abi} from "viem";

export const Treasury_ADDRESS = '0x20d9a934efBBD895EDbD0905E16533Dd6D5B0E83' as `0x${string}`;
export const TreasuryABI = TreasuryABIJSON.abi as readonly unknown [] as Abi;
export const treasuryConfig = {
    address: Treasury_ADDRESS,
    abi: TreasuryABI,
} as const;