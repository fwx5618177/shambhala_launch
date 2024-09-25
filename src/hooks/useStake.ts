import {
  useWriteContract,
  useReadContract,
  useSimulateContract,
  useAccount,
  useWaitForTransactionReceipt,
  useSwitchChain,
} from "wagmi";
import { useCallback, useEffect, useState } from "react";
import { ContractConfig } from "@/contract/config";
import { message } from "@/providers/MessageProvider";

export const useStake = () => {
  const { BSC_STAKE, BSC_USDT } = ContractConfig;
  const { address: accountAddress, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const [isStaking, setIsStaking] = useState(false);

  // 获取用户 USDT 余额
  const { data: balance, isError: isFetchedBalance } = useReadContract({
    abi: BSC_USDT.abi,
    chainId: 56,
    address: BSC_USDT.address,
    functionName: "balanceOf",
    args: [accountAddress as `0x${string}`],
  });

  // 准备 `stake` 函数模拟
  const { data: stakeSimulation } = useSimulateContract({
    abi: BSC_STAKE.abi,
    chainId: 56,
    address: BSC_STAKE.address,
    functionName: "stake",
    args: [1],
  });

  const { data: stakeHash, writeContractAsync } = useWriteContract();
  const {
    isSuccess: isStakeSuccess,
    isError: isStakeError,
    isLoading: isStakeLoading,
  } = useWaitForTransactionReceipt({ hash: stakeHash, chainId: 56 });

  // 执行 stake 操作
  const handleStake = useCallback(
    async (stakeAmount: number) => {
      try {
        message.info("Staking, please wait...");

        if (switchChainAsync && chainId !== 56) {
          await switchChainAsync({ chainId: 56 });
        }

        // 确认余额足够
        if (Number(balance) < stakeAmount) {
          message.error("Insufficient USDT balance.");
          return;
        }

        setIsStaking(true);
        const stakeTx = await writeContractAsync({
          abi: BSC_STAKE.abi,
          chainId: 56,
          address: BSC_STAKE.address,
          functionName: "stake",
          args: [stakeAmount],
        });

        if (stakeTx) {
          message.success(`Stake transaction submitted, tx hash: ${stakeTx}`);
        }
      } catch (error) {
        message.error("Stake failed, please try again.");
        console.error("Stake error:", error);
      } finally {
        setIsStaking(false);
      }
    },
    [
      switchChainAsync,
      chainId,
      balance,
      writeContractAsync,
      BSC_STAKE.abi,
      BSC_STAKE.address,
    ]
  );

  useEffect(() => {
    if (isStakeSuccess) {
      message.success(`Stake successful, tx hash: ${stakeHash}`);
    }
    if (isStakeError) {
      message.error(`Stake failed, please try again, tx hash: ${stakeHash}`);
    }
  }, [isStakeSuccess, isStakeError, stakeHash]);

  return {
    stakeSimulation,
    isStaking,
    isStakeLoading,
    isStakeError,
    isStakeSuccess,
    handleStake,
  };
};
