const build = 'dev'
// const build = 'prod'
import usdtErc20ABI from "@/commons/abis/USDT-ERC20.ts"
import usdtErc20ABI_test from "@/commons/abis/USDT-ERC20-test.ts"
const erc20Address_test = "0x3Ab1C11186d76A6815125636706374bf5d5B7cac"
const erc20Address = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
export const USDT_ERC20 = {
	address: build == 'dev' ? erc20Address_test : erc20Address,
	abi: build == 'dev' ? usdtErc20ABI_test : usdtErc20ABI,
	decimals: build == 'dev' ? 18n : 6n
}
import USDTEarnVaultABI from "@/commons/abis/USDTEarnVault-ABI.ts"
import USDTEarnVaultABI_test from "@/commons/abis/USDTEarnVault-ABI-test.ts"
const usdtvaultAddress_test = "0x6e728a5562fca36A486BE654E5F1331FeEd898A6"
const usdtvaultAddress = "0xc99144980B60Cde0773f818226e7AA31097C7044"
export const USDTVAULT_ERC20 = {
	address: build == 'dev' ? usdtvaultAddress_test : usdtvaultAddress,
	abi: build == 'dev' ? USDTEarnVaultABI_test : USDTEarnVaultABI,
	decimals: build == 'dev' ? 18n : 6n
}
