import { ContractConfig } from '@/contract/config';
import { config } from '@/wagmi';
import { readContract } from 'wagmi/actions';

const { USDT_ERC20 } = ContractConfig;

export const getDecimals = async (address: `0x${string}`) => {
    return await readContract(config, {
        abi: USDT_ERC20.abi,
        address: address,
        functionName: "decimals",
        args: []
    });
}