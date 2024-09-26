import React, { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Loading from "@/components/Loading";
import InputCard from "@/components/InputCard";
import moment from "moment";
import { matchImg } from "@/utils/matchImg";
import { ContractConfig } from "@/contract/config";
import {
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
  useBlockNumber,
} from "wagmi";
import _ from "lodash";
import { getContractMsg } from "@/utils/contract";
import { message } from "@/providers/MessageProvider";
import { InvestmentItem } from "@/services/investService";
import { usePurchaseDefi } from "@/services/usePurchaseDefi";
import { handleShowDay } from "@/utils/handleShowDay";
import numeral from "numeral";
import { useApproveStake } from "@/hooks/useApproveStake";
import { useStake } from "@/hooks/useStake";
import { toSmallestUnit } from "@/utils/toSmallestUnit";
import { isZero } from "@/utils/math";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const { USDT_ERC20, USDT_VAULT_ERC20, BSC_USDT } = ContractConfig;

interface MarketCardProps {
  abbrId: string;
  logo: string;
  subLogo: string;
  coinName: string;
  apy: number | string;
  tvl: string;
  network: string;
  rate?: number;
  pid: number;
  contractAddress: `0x${string}`;
  fixedDuration: number;
  depositLimit: string;
  startBlock: number;
  cycle: number;
  maturity: string;
}

const MarketCard: React.FC<MarketCardProps> = ({
  abbrId,
  logo,
  coinName,
  apy,
  cycle,
  maturity,
  tvl,
  network,
  rate,
  pid,
  contractAddress,
  depositLimit,
  fixedDuration,
  startBlock,
}) => {
  const [state, setState] = useState(0);
  const [inputAmount, setInputAmount] = useState(0);
  const [busy, setBusy] = useState(false);
  const [myInvestings, setMyInvestings] = useState<InvestmentItem[]>([]);
  const { address: accountAddress, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { purchaseDefi } = usePurchaseDefi();
  const formattedApy = useMemo(() => (Number(apy) / 1000000) * 100, [apy]);
  const { data: blockNumber } = useBlockNumber();

  const { beforeStakeHandleBsc, isApproving } = useApproveStake();
  const { handleStake } = useStake();

  const { data: hash, writeContractAsync } = useWriteContract();
  const { isSuccess, isError } = useWaitForTransactionReceipt({
    hash,
  });

  // useEffect(() => {
  //   const fetchMyInvestments = async () => {
  //     if (accountAddress) {
  //       try {
  //         const investingData = await fetchInvestments(accountAddress);
  //         setMyInvestings(investingData);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //   };

  //   fetchMyInvestments();
  // }, [accountAddress]);

  const { data } = useReadContracts({
    contracts: [
      // 读取合约数据：获取池信息
      {
        address: contractAddress,
        abi: USDT_VAULT_ERC20.abi,
        functionName: "pools",
        args: [pid],
      },
      // 读取合约数据：获取池状态
      {
        address: contractAddress,
        abi: USDT_VAULT_ERC20.abi,
        functionName: "poolState",
        args: [pid],
      },
      // 查询用户余额
      {
        address: USDT_ERC20.address as `0x${string}`,
        abi: USDT_ERC20.abi,
        functionName: "balanceOf",
        args: [accountAddress as `0x${string}`],
      },
      // 查询授权额度
      {
        address: USDT_ERC20.address as `0x${string}`,
        abi: USDT_ERC20.abi,
        functionName: "allowance",
        args: [accountAddress as `0x${string}`, contractAddress],
      },
    ],
  });

  const handleInvestDebounce = useCallback(async () => {
    if (!isConnected) {
      openConnectModal?.();
      return;
    }

    if (isZero(inputAmount)) {
      message.error("Asset must be greater than zero");
      return;
    }

    try {
      const inputAmountNumber = toSmallestUnit(inputAmount, BSC_USDT.decimals);
      const amount = BigInt(inputAmountNumber);
      const depositLimitNumber = numeral(depositLimit).value() || 0;

      const approveTx = await beforeStakeHandleBsc(inputAmountNumber);

      if (!approveTx) {
        message.error("Approval failed");
        return;
      }

      await handleStake(inputAmountNumber);

      return;

      if (busy) return;

      if (!isConnected) {
        message.error("Please connect wallet first!");
        return;
      }

      setBusy(true);

      console.log("data:", data);
      const [poolInfo, poolState, balance, allowance] =
        data?.map((item) => BigInt((item?.result as string) || 0)) || [];

      if (poolState && poolState > 1) {
        message.error("Product has been ended");
        return;
      }

      // if (inputAmount <= 0) {
      //   message.error("Asset must be greater than zero");
      //   return;
      // }

      if (fixedDuration === 1) {
        const existingInvestments = myInvestings.filter(
          (item) => item?.pid === pid && item?.address === contractAddress
        );

        if (existingInvestments.length > 0) {
          message.error("Purchase only once");
          return;
        }
      }

      if (amount < BigInt(depositLimitNumber)) {
        message.error(
          `Assets must be greater than ${
            depositLimitNumber / 10 ** USDT_ERC20.decimals
          } USDT`
        );
        return;
      }

      if (balance && amount > balance) {
        message.error("Insufficient balance");
        return;
      }

      if (allowance && amount > allowance) {
        setState(1); // 状态设置为审批中

        // 写入合约数据：授权
        const approveTx = await writeContractAsync({
          address: USDT_ERC20.address as `0x${string}`,
          abi: USDT_ERC20.abi,
          functionName: "approve",
          args: [contractAddress, amount],
        });

        if (isSuccess)
          message.success(`Approval successful, hash: ${approveTx}`);

        if (isError) throw new Error("Approval failed");
      }

      setState(2);
      // 写入合约数据：投资
      const investTx = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: USDT_VAULT_ERC20.abi,
        functionName: "invest",
        args: [pid, amount],
      });

      if (isSuccess)
        message.success(`Investment successful, hash: ${investTx}`);

      if (isError) throw new Error("Investment failed");

      await purchaseDefi({
        signedTx: investTx,
        id: abbrId,
        amount: inputAmount.toString(),
      });
    } catch (error: any) {
      console.error(error);
      message.error(getContractMsg(error?.message, "Invest"));
    } finally {
      setBusy(false);
      setState(0);
    }
  }, [
    abbrId,
    beforeStakeHandleBsc,
    busy,
    contractAddress,
    data,
    depositLimit,
    fixedDuration,
    handleStake,
    inputAmount,
    isConnected,
    isError,
    isSuccess,
    myInvestings,
    openConnectModal,
    pid,
    purchaseDefi,
    writeContractAsync,
  ]);

  const handleInvest = _.debounce(handleInvestDebounce);

  return (
    <div className="w-full max-w-[500px] h-auto p-4 bg-white rounded-lg transition-all duration-300">
      <div className="w-full h-auto text-[8px] rounded-[12px] sm:h-[90px] px-4 py-2 flex flex-row flex-nowrap justify-between items-center mb-[5px] text-primary bg-market-card-bg sm:shadow-card">
        {/* 第一个部分 */}
        <div className="flex items-center w-full sm:w-auto overflow-hidden">
          <div className="relative mr-2 flex-shrink-0">
            <Image
              src={matchImg(logo)}
              alt={coinName}
              width={36}
              height={36}
              className="rounded-coin w-[24px] h-[24px] sm:w-[40px] sm:h-[40px]"
            />
            {/*<Image*/}
            {/*  src={subLogo}*/}
            {/*  alt={coinName}*/}
            {/*  width={20}*/}
            {/*  height={20}*/}
            {/*  className="absolute bottom-0 right-0"*/}
            {/*/>*/}
          </div>
          <div className="ml-[2px] flex items-center gap-2 overflow-hidden">
            <h3 className="text-[26px] sm:text-coinXl truncate">
              {formattedApy}
            </h3>
            <div className="flex flex-col truncate">
              <p className="text-sm sm:text-lg font-bold truncate">%</p>
              <p className="text-primary text-xs sm:text-coinSm truncate">
                APY
              </p>
            </div>
          </div>
        </div>

        {/* 第二部分: TVL 和 Network */}
        <div className="flex items-center justify-around w-full sm:w-auto mt-2 sm:mt-0">
          <div className="flex flex-col items-center gap-1 pr-[2rem]">
            <p className="text-[16px] sm:text-[22px] text-primary truncate">
              {tvl}
            </p>
            <p className="text-[10px] sm:text-[12px] text-secondary">TVL</p>
          </div>

          {/* 中间的分隔线 */}
          <div className="h-[40px] w-[2px] bg-[#ededed] hidden sm:block"></div>

          {/* 第三部分: Network */}
          <div className="ml-4 flex flex-col items-center gap-2">
            <div className="flex items-center gap-[2px] max-w-[80px]">
              <Image
                src={"/bsc.svg"}
                width={16}
                height={16}
                alt="binance smart chain"
              />
              <p className="text-primary text-xs sm:text-desc font-500 truncate">
                {network}
              </p>
            </div>

            <p className="text-[10px] sm:text-desc text-secondary truncate">
              {fixedDuration === 0
                ? handleShowDay(startBlock, Number(blockNumber), cycle)
                : moment(maturity).format("ll")}
            </p>
          </div>
        </div>
      </div>

      <InputCard
        logo={matchImg(logo)}
        coinName={coinName}
        rate={rate || 1}
        network={network}
        apy={Number(apy)}
        cycle={cycle}
        maturity={maturity}
        fixedDuration={fixedDuration}
        onChange={(value) => setInputAmount(value)}
      />

      <div
        onClick={isApproving ? () => {} : handleInvest}
        className="w-full h-[40px] sm:h-[60px] flex items-center justify-center bg-primary text-thirdary text-[14px] sm:text-[16px] font-[600] rounded-[10px] sm:rounded-[20px] button-hover mt-4 sm:mt-0 hover:bg-[#484646]"
        style={{
          cursor: isApproving ? "not-allowed" : "pointer",
          backgroundColor: isApproving ? "#d3d3d3" : "",
        }}
      >
        {state === 0 ? (
          "Invest"
        ) : state === 1 ? (
          <Loading text="Approving" type="asset" />
        ) : (
          <Loading text="Investing" type="asset" />
        )}
      </div>
    </div>
  );
};

export default MarketCard;
