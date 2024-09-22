import usdtErc20ABI_test from "@/abis/testnet/USDT-ERC20.json";
import USDTEarnVaultABI_test from "@/abis/testnet/USDT-EarnVault.json";

import usdtErc20ABI from "@/abis/mainnet/USDT-ERC20.json";
import USDTEarnVaultABI from "@/abis/mainnet/USDT-EarnVault.json";

import BSC_USDT_ABI from "@/abis/mainnet/BSC-USDT.json";

const isDev = process.env.NODE_ENV === "development";

export const config = {
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
    address: "0x6e7E9700350467bc645fb2985D6b63972Eb9F9e1",
    abi: BSC_USDT_ABI,
    decimals: 6,
  },
};
