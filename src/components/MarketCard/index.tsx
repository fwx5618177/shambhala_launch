import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Loading from "@/components/Loading";
import InputCard from "@/components/InputCard";
import moment from "moment";
import useStore from "@/store/useStore";
import { matchImg } from "@/utils/matchImg";
import { ContractConfig } from "@/contract/config";

import {
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
  useBlockNumber,
} from "wagmi";

import { getContractMsg } from "@/utils/contract";
import { message } from "@/providers/MessageProvider";
import { fetchInvestments, InvestmentItem } from "@/services/investService";
import { usePurchaseDefi } from "@/services/usePurchaseDefi";
import { handleShowDay } from "@/utils/handleShowDay";

const { USDT_ERC20, USDT_VAULT_ERC20 } = ContractConfig;

interface MarketCardProps {
  abbrId: string;

  logo: string;
  subLogo: string;
  coinName: string;
  apy: number;

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
  subLogo,
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
  const { address: accountAddress, isConnected, chain } = useAccount();
  const { purchaseDefi, loading } = usePurchaseDefi();
  const formattedApy = useMemo(() => (Number(apy) / 1000000) * 100, [apy]);
  const { data: blockNumber } = useBlockNumber();
  const { userInfo } = useStore();

  const { data: hash, writeContractAsync } = useWriteContract();
  // 使用 useWaitForTransaction 监听授权和投资交易状态
  const { isSuccess, isError } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    const fetchMyInvestments = async () => {
      if (accountAddress) {
        try {
          const investingData = await fetchInvestments(accountAddress);
          setMyInvestings(investingData);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchMyInvestments();
  }, [accountAddress]);

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
        args: [accountAddress],
      },
      // 查询授权额度
      {
        address: USDT_ERC20.address as `0x${string}`,
        abi: USDT_ERC20.abi,
        functionName: "allowance",
        args: [accountAddress, contractAddress],
      },
    ],
  });

  const handleInvest = useCallback(async () => {
    if (busy || loading) return;

    if (!isConnected) {
      message.error("Please connect wallet first!");
      return;
    }

    setBusy(true);
    try {
      const [poolInfo, poolState, balance, allowance] =
        data?.map((item) => BigInt(item?.result as string)) || [];

      if (poolState && poolState > 1) {
        message.error("Product has been ended");
        return;
      }

      if (inputAmount <= 0) {
        message.error("Asset must be greater than zero");
        return;
      }

      if (fixedDuration === 1) {
        const existingInvestments = myInvestings.filter(
          (item) => item?.pid === pid && item?.address === contractAddress
        );

        if (existingInvestments.length > 0) {
          message.error("Purchase only once");
          return;
        }
      }

      const amount = BigInt(inputAmount * Math.pow(10, USDT_ERC20.decimals));

      if (amount < BigInt(depositLimit)) {
        message.error(
          `Assets must be greater than ${
            Number(depositLimit) / 10 ** USDT_ERC20.decimals
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
    busy,
    contractAddress,
    data,
    depositLimit,
    fixedDuration,
    inputAmount,
    isConnected,
    isError,
    isSuccess,
    loading,
    myInvestings,
    pid,
    purchaseDefi,
    writeContractAsync,
  ]);

  return (
    <div className="w-[500px] h-[473px]">
      <div className="w-full h-[90px] px-4 flex justify-between items-center mb-[5px] bg-market-card-bg rounded-card shadow-card text-primary">
        {/* 第一个部分 */}
        <div className="flex items-center">
          <div className="relative mr-2">
            <Image
              src={matchImg(logo)}
              alt={coinName}
              width={40}
              height={40}
              className="rounded-coin"
            />
            <Image
              src={subLogo}
              alt={coinName}
              width={20}
              height={20}
              className="absolute bottom-0 right-normal"
            />
          </div>
          <div className="ml-4 flex items-center gap-2">
            <h3 className="text-coinXl">{formattedApy}</h3>
            <div>
              <p>%</p>
              <p className="text-primary text-coinSm">APY</p>
            </div>
          </div>
        </div>

        <div className="h-[40px] w-[1px] bg-[#ededed]"></div>

        <div className="ml-4 flex flex-col items-center gap-1">
          <p className="text-[22px] text-primary">{tvl}</p>
          <p className="text-[12px] text-secondary">TVL</p>
        </div>

        <div className="h-[40px] w-[1px] bg-[#ededed]"></div>

        <div className="ml-4 flex flex-col items-center gap-2">
          <div className="flex items-center gap-[2px]">
            <Image src={"/eth.svg"} width={16} height={16} alt="eth" />
            <p className="text-primary text-desc font-500">{network}</p>
          </div>

          <p className="text-desc text-secondary">
            Date:{" "}
            {fixedDuration == 0
              ? handleShowDay(startBlock, Number(blockNumber), cycle)
              : moment(maturity).format("ll")}
          </p>
        </div>
      </div>
      <InputCard
        logo={matchImg(logo)}
        coinName={coinName}
        rate={rate || 1}
        network={network}
        apy={apy}
        cycle={cycle}
        maturity={maturity}
        fixedDuration={fixedDuration}
        onChange={(value) => setInputAmount(value)}
      />
      <div
        onClick={handleInvest}
        className="w-full h-[60px] flex items-center justify-center bg-primary text-thirdary text-[16px] font-600 rounded-[20px] button-hover"
      >
        {state == 0 ? (
          "Invest"
        ) : state == 1 ? (
          <Loading text="Approving" type="asset" />
        ) : (
          <Loading text="Investing" type="asset" />
        )}
      </div>
    </div>
  );
};

export default MarketCard;
