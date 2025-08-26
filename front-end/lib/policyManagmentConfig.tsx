import PolicyManagerABIJson from './PolicyManagerABI.json';
import type { Abi } from 'viem';

export const POLICY_MANAGER_ADDRESS = '0xd4cA48CcE956887d08073425Fe2C2B3c0EEd7E52' as `0x${string}`;


export const PolicyManagerABI = PolicyManagerABIJson.abi as readonly unknown[] as Abi;

export const policyManagerConfig = {
  address: POLICY_MANAGER_ADDRESS,
  abi: PolicyManagerABI,
} as const;
    