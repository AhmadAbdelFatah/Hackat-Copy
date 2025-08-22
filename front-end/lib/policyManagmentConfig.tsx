// front-end/lib/policyManagerConfig.ts
import PolicyManagerABIJson from './PolicyManagerABI.json';
import type { Abi } from 'viem';

export const POLICY_MANAGER_ADDRESS = '0x57d263aDD2727e40B83ceC864bbE12e10093dc77' as `0x${string}`;


export const PolicyManagerABI = PolicyManagerABIJson.abi as readonly unknown[] as Abi;

export const policyManagerConfig = {
  address: POLICY_MANAGER_ADDRESS,
  abi: PolicyManagerABI,
} as const;
    