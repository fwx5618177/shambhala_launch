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

export const useApproveStake = () => {
  const { BSC_USDT, BSC_STAKE } = ContractConfig;
  const { address: accountAddress } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { chainId } = useAccount();
  const [isApproving, setIsApproving] = useState(false);

  // 获取当前 allowance（授权额度）
  const {
    data: allowance,
    isSuccess: isAllowanceSuccess,
    isLoading: isAllowanceLoading,
    isError: isAllowanceError,
  } = useReadContract({
    abi: BSC_USDT.abi,
    chainId: 56,
    address: BSC_USDT.address,
    functionName: "allowance",
    args: [accountAddress as `0x${string}`, BSC_STAKE.address],
  });

  // 准备 `approve` 函数模拟
  const { data: prepareResult, isError: isSimulateError } = useSimulateContract(
    {
      abi: BSC_USDT.abi,
      chainId: 56,
      address: BSC_USDT.address,
      functionName: "approve",
      args: [BSC_STAKE.address, allowance],
    }
  );

  const { data: hash, writeContractAsync } = useWriteContract();
  const {
    isSuccess: isTransactionSuccess,
    isError: isTransactionError,
    isLoading: isTransactionLoading,
  } = useWaitForTransactionReceipt({ hash, chainId: 56 });

  // 执行 approve 操作
  const beforeStakeHandleBsc = useCallback(
    async (inputValue?: number) => {
      try {
        if (switchChainAsync && chainId !== 56) {
          await switchChainAsync({
            chainId: 56,
          }); // 切换到 BSC 链
          return;
        }
        // if (!isAllowanceSuccess && !inputValue) {
        //   message.error("Allowance not found, please try again.");
        //   return;
        // }

        // if (isSimulateError) {
        //   message.error("Simulation failed, cannot proceed with approval.");
        //   return;
        // }

        setIsApproving(true);
        const approveTx = await writeContractAsync({
          abi: BSC_USDT.abi,
          chainId: 56,
          address: BSC_USDT.address,
          functionName: "approve",
          args: [BSC_STAKE.address, inputValue || allowance],
        });

        console.log("approveTx", approveTx, prepareResult);

        if (approveTx) {
          message.success(
            `Approve transaction submitted, tx hash: ${approveTx}`
          );
        }

        return approveTx;
      } catch (error: any) {
        message.error(`Approve failed, error: ${error?.message}`);
        console.error("Approve error:", error);
      } finally {
        setIsApproving(false);
      }
    },
    [
      switchChainAsync,
      chainId,
      prepareResult,
      writeContractAsync,
      BSC_USDT.abi,
      BSC_USDT.address,
      BSC_STAKE.address,
      allowance,
    ]
  );

  useEffect(() => {
    if (isTransactionSuccess) {
      message.success(
        `Transaction successful, USDT approved, tx hash: ${hash}`
      );
    }
    if (isTransactionError) {
      message.error(`Transaction failed, please try again, tx hash: ${hash}`);
    }
  }, [isTransactionSuccess, isTransactionError, hash]);

  return {
    allowance,
    prepareResult,
    isApproving,
    isAllowanceLoading,
    isAllowanceError,
    isTransactionSuccess,
    isTransactionLoading,
    beforeStakeHandleBsc,
  };
};
