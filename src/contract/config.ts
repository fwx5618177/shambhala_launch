import usdtErc20ABI_test from "@/abis/testnet/USDT-ERC20.json";
import USDTEarnVaultABI_test from "@/abis/testnet/USDT-EarnVault.json";

import usdtErc20ABI from "@/abis/mainnet/USDT-ERC20.json";
import USDTEarnVaultABI from "@/abis/mainnet/USDT-EarnVault.json";

import BSC_USDT_ABI from "@/abis/mainnet/BSC-USDT.json";
import BSC_STAKE_ABI from "@/abis/mainnet/BSC-STAKE.json";

const isDev = process.env.NODE_ENV === "development";

export interface ContractConfigProps {
  [key: string]: {
    address: `0x${string}`;
    abi: any;
    decimals: number;
  };
}

export const ContractConfig = {
  USDT_ERC20: {
    address: isDev
      ? process.env.NEXT_PUBLIC_USDT_ERC20_ADDRESS_DEV
      : process.env.NEXT_PUBLIC_USDT_ERC20_ADDRESS_PROD,
    abi: isDev ? usdtErc20ABI_test : usdtErc20ABI,
    decimals: 6,
  },
  USDT_VAULT_ERC20: {
    address: isDev
      ? process.env.NEXT_PUBLIC_USDT_VAULT_ADDRESS_DEV
      : process.env.NEXT_PUBLIC_USDT_VAULT_ADDRESS_PROD,
    abi: isDev ? USDTEarnVaultABI_test : USDTEarnVaultABI,
    decimals: 6,
  },
  BSC_USDT: {
    address: process.env.NEXT_PUBLIC_USDT_ERC20_ADDRESS_BSC,
    abi: BSC_USDT_ABI,
    decimals: 6,
  },
  BSC_STAKE: {
    address: process.env.NEXT_PUBLIC_STAKE_ADDRESS_BSC,
    abi: BSC_STAKE_ABI,
    decimals: 6,
  },
} as ContractConfigProps;
