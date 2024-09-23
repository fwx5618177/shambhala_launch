import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Limit from "@/components/Limit";
import InputBalance from "@/components/InputBalance";
import LineCharts from "@/components/LineCharts";
import Loading from "@/components/Loading";
import { useTranslation } from "react-i18next";
import useStore from "@/store/useStore";
import { matchImg } from "@/utils/matchImg";
import {
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
  useBlockNumber,
} from "wagmi";
import { readContract } from 'wagmi/actions';
import { ContractConfig } from "@/contract/config";
import { getContractMsg } from "@/utils/contract";

import { formatUnits } from "viem";
import { useRouter } from "next/router";
import moment from "moment";
import { formatUsdt } from "@/utils/formatUsdt";
import { fetchInvestments, InvestmentItem } from "@/services/investService";
import { calculateEarnings } from "@/utils/calculationProfit";
import { getDecimals } from "@/hoocs/getDecimals";
import { getSymbol } from "@/hoocs/getSymbol";
import { message } from "@/providers/MessageProvider";
import { usePurchaseDefi } from "@/services/usePurchaseDefi";
import numeral from "numeral";

const { USDT_VAULT_ERC20, USDT_ERC20 } = ContractConfig;

export interface QueryParams {
  abbrId: string;
  abbrLogo: string;
  abbrTitle: string;
  abbrApy: number;
  abbrVersion: string;
  abbrExpireTime: string;
  pid: number;
  abbrCycle: number;
  fixedDuration: number;
  depositLimit: bigint;
  contractAddress: `0x${string}`;
}

const AssetSection = () => {
  const { t } = useTranslation("common");
  const [selectedTab, setSelectedTab] = useState<"info" | "apy">("info");
  const [selectedRedeem, setSelectedRedeem] = useState<"invite" | "redeem">(
    "invite"
  );
  const [inputValue, setInputValue] = useState<number>(0.0);
  const [step, setStep] = useState<number>(0);
  const { address: accountAddress, isConnected, chain } = useAccount();
  const rate = 1;
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const {
    abbrId = '',
    abbrLogo = '',
    abbrTitle = '',
    abbrApy = '0',
    abbrVersion = '',
    abbrExpireTime = '',
    contractAddress = '0x1',
    pid = '0',
    abbrCycle = '0',
    fixedDuration = '0',
    depositLimit = '0',
  } = router.query as Partial<QueryParams>;

  const queryParams: QueryParams = {
    abbrId,
    abbrLogo,
    abbrTitle,
    abbrApy: Number(abbrApy),
    abbrVersion,
    abbrExpireTime,
    pid: Number(pid),
    abbrCycle: Number(abbrCycle),
    fixedDuration: Number(fixedDuration),
    depositLimit: BigInt(depositLimit),
    contractAddress,
  };

  const { userInfo } = useStore();
  const [receives, setReceives] = useState<any[]>([]);
  const [myInvestings, setMyInvestings] = useState<InvestmentItem[]>([]);

  const [dailyEarn, setDailyEarn] = useState<string>('0');
  const [totalEarn, setTotalEarn] = useState<string>('0');

  // 确保 abbrExpireTime 存在且是有效的字符串
  const daysDifference = useMemo(() => {
    // 确保 abbrExpireTime 存在且不是空字符串
    if (!abbrExpireTime || !moment(abbrExpireTime, moment.ISO_8601, true).isValid()) {
      console.warn("Invalid abbrExpireTime:", abbrExpireTime);
      return 0; // 或者你可以返回其他默认值
    }

    // 计算日期差异
    const diffDays = moment(abbrExpireTime).diff(moment(), "days");

    // 检查 diffDays 是否有效
    if (isNaN(diffDays)) {
      console.warn("Failed to calculate difference in days:", diffDays);
      return 0; // 默认返回 0 天，或者根据业务逻辑返回其他值
    }

    return diffDays;
  }, [abbrExpireTime]);
  const points = numeral(100).divide(Number(abbrCycle) || 1).multiply(daysDifference).value();

  const formattedApy = (Number(abbrApy) / 1000000) * 100;

  const { data: hash, writeContractAsync } = useWriteContract();
  const { isSuccess, isError } = useWaitForTransactionReceipt({
    hash
  })
  const { purchaseDefi, loading } = usePurchaseDefi();


  const { data, refetch } = useReadContracts({
    contracts: [
      // 读取合约数据：获取用户是否可以提取奖励
      {
        abi: USDT_VAULT_ERC20.abi,
        address: contractAddress,
        functionName: "canHarvest",
        args: [pid, accountAddress as `0x${string}`],
      },
      // 读取合约数据：获取池信息
      {
        abi: USDT_VAULT_ERC20.abi,
        address: contractAddress,
        functionName: "pools",
        args: [pid],
      },
      // 读取合约数据：获取池状态
      {
        abi: USDT_VAULT_ERC20.abi,
        address: contractAddress,
        functionName: "poolState",
        args: [pid],
      },
      // 查询用户余额
      {
        abi: USDT_ERC20.abi,
        address: USDT_ERC20.address,
        functionName: "balanceOf",
        args: [accountAddress as `0x${string}`],
      },
      // 查询用户授权额度
      {
        abi: USDT_ERC20.abi,
        address: USDT_ERC20.address,
        functionName: "allowance",
        args: [accountAddress as `0x${string}`, contractAddress],
      }
    ]
  });

  const [canHarvest, _poolInfo, poolState, balanceData, allowance] = data?.map((item) => item?.result) || [];

  // 将 balance 数据转换为 bigint 或默认值 0
  const balance = balanceData ? BigInt(balanceData as string) : BigInt(0);

  // 使用 useMemo 来优化 balance 的格式化
  const formattedBalance = useMemo(() => {
    // 如果 balance 是 0，则直接返回 "0.00 USDT"
    if (!balance) return "0.00 USDT";

    // 格式化 balance 为 USDT 格式，保留两位小数
    return `${formatUsdt(formatUnits(balance, USDT_ERC20.decimals), 2)} USDT`;
  }, [balance]);

  console.log("canHarvest", canHarvest, "poolInfo", _poolInfo, "poolState", poolState, "balance", balance, "allowance", allowance);

  useEffect(() => {
    const fetchMyInvestings = async () => {
      if (accountAddress) {
        try {
          const investingData = await fetchInvestments(accountAddress);
          setMyInvestings(investingData);
        } catch (error) {
          console.error(error);
        }
      }
    }

    fetchMyInvestings();
  }, [accountAddress])

  const inputChange = useCallback((value: number) => {
    setInputValue(value);
    console.log("input change", value, abbrApy);
    const { dailyEarn, totalEarn } = calculateEarnings(value, Number(abbrApy), Number(fixedDuration), Number(abbrCycle));

    setDailyEarn(dailyEarn);
    setTotalEarn(totalEarn);
  }, [])

  const changeTab = useCallback((tab: "invite" | "redeem") => {
    if (busy) return; // 正在执行操作时禁止切换

    setSelectedRedeem(tab);
    setStep(0); // 重置步骤

    if (tab === "redeem") {
      getYourReceive(); // 选择领取时获取奖励信息
    }
  }, [busy])

  // 获取 Decimals 和 Symbol
  const getDecimalsAndSymbol = async (contractAddress: `0x${string}`) => {
    const [decimals, symbol] = await Promise.all([
      getDecimals(contractAddress),
      getSymbol(contractAddress),
    ]);
    return { decimals, symbol };
  };

  // 获取奖励信息
  const getYourReceive = useCallback(async () => {
    try {
      if ((canHarvest as [`0x${string}`[], string[]])?.length === 2) {
        const [addrs, values] = canHarvest as [`0x${string}`[], string[]];
        const list = [];

        for (let i = 0; i < values.length; i++) {
          const v = values[i];
          const addr = addrs[i];
          const { decimals, symbol } = await getDecimalsAndSymbol(addr);

          console.log("decimals", decimals, "symbol", symbol);

          list.push(`${formatUsdt(formatUnits(BigInt(v), Number(decimals)), 4)} ${symbol}`);
        }

        setReceives(list);
      }
    } catch (error: any) {
      message.error(`Failed to get receive: ${error.message}`);
    }
  }, []);

  async function handleInvest() {
    if (!isConnected) {
      message.error("Please connect wallet first!");
      return;
    }

    if (step == 0) {
      setStep(1);
      return;
    }

    setBusy(true);

    try {
      if (Number(poolState) > 1) {
        message.error("Product has been ended");
        return;
      }
      if (inputValue <= 0) {
        message.error("Asset must be greater than zero");
        setBusy(false);
        return;
      }
      if (Number(fixedDuration) === 1) {
        const existingInvestments = myInvestings.filter(
          (item) => item?.pid === Number(pid) && item?.address == contractAddress
        );

        if (existingInvestments.length > 0) {
          message.error("Purchase only once");
          return;
        }
      }

      const amount = BigInt(inputValue * Math.pow(10, USDT_ERC20.decimals));

      if (amount < BigInt(depositLimit)) {
        message.error(
          "Assets must bigger than " +
          BigInt(depositLimit) / BigInt(Math.pow(10, USDT_ERC20.decimals)) +
          " USDT"
        );
        return;
      }

      if (balance && BigInt(amount) > BigInt(balance)) {
        message.error("Insufficient balance");
        setBusy(false);
        return;
      }

      if (allowance && BigInt(allowance as string) < amount) {
        setStep(2);

        // 写入合约数据：授权
        const approveTx = await writeContractAsync({
          abi: USDT_ERC20.abi,
          address: USDT_ERC20.address as `0x${string}`,
          functionName: "approve",
          args: [contractAddress, amount],
        })

        if (isSuccess) message.success(`Approval successful, hash: ${approveTx}`);
        if (isError) throw new Error(`Approval failed, hash: ${approveTx}`);
      }

      setStep(3);
      // 写入合约数据：投资
      const investTx = await writeContractAsync({
        abi: USDT_VAULT_ERC20.abi,
        address: contractAddress as `0x${string}`,
        functionName: "invest",
        args: [pid, amount],
        account: accountAddress,
      })

      if (isSuccess) message.success(`Investment successful, hash: ${investTx}`);
      if (isError) throw new Error(`Investment failed, hash: ${investTx}`);

      await purchaseDefi({
        signedTx: investTx,
      });
    } catch (e: any) {
      message.error(getContractMsg(e.message, "Invest"));
    } finally {
      refetch();
      setBusy(false);
      setStep(0);
    }
  }

  async function handleRedeem() {
    if (busy || loading) return;

    if (!isConnected) {
      message.error("Please connect wallet first!");
      return;
    }

    setBusy(true);
    try {

      if (poolState && poolState !== BigInt(2)) {
        message.error("The product has not yet expired");
        return;
      }

      // setState(1)
      const redeemTx = await writeContractAsync({
        abi: USDT_VAULT_ERC20.abi,
        address: contractAddress as `0x${string}`,
        functionName: "redeem",
        args: [pid],
        account: accountAddress,
      });

      if (isSuccess) message.success(`Redeem successful, hash: ${redeemTx}`);
      if (isError) throw new Error(`Redeem failed, hash: ${redeemTx}`);
    } catch (e: any) {
      message.error(getContractMsg(e.message, "Redeem"));
    } finally {
      setBusy(false);
      refetch();
    }
  }

  return (
    <section className="w-full bg-thirdary flex items-start pt-[86px] px-[109px]">
      <div className="max-w-[720px] w-2/3 mr-[52px] text-primary mb-[232px]">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex justify-center items-between space-x-4">
            <div className="relative mr-2">
              <Image
                src={matchImg(abbrLogo)}
                alt={"tether"}
                width={60}
                height={60}
                className="rounded-coin"
              />
              <Image
                src={"/aave.png"}
                alt={"aave"}
                width={30}
                height={30}
                className="absolute bottom-0 right-normal"
              />
            </div>
            <div>
              <h1 className="text-coinLg font-500">{abbrTitle}</h1>
              <p className="text-coinSm text-secondary font-400">SHAMBHALA</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-baseline justify-between font-600 gap-2">
              <span className="text-[42px] flex justify-end">
                {formattedApy}%
              </span>
              <span className="text-coinSm">APY</span>
            </div>
            <div className="bg-manturity text-primary px-[9px] py-[5px] rounded-[2px] text-coinSm">
              Maturity: {abbrExpireTime}
            </div>
          </div>
        </div>

        <div className="flex space-x-6 mb-8">
          <div
            onClick={() => setSelectedTab("info")}
            className={`px-[24px] py-[10px] text-primary cursor-pointer ${selectedTab === "info" ? "bg-[#f1f1f1] rounded-[50px]" : ""
              }`}
          >
            Info
          </div>
          <div
            onClick={() => setSelectedTab("apy")}
            className={`px-[24px] py-[10px] text-primary cursor-pointer ${selectedTab === "apy" ? "bg-[#f1f1f1] rounded-[50px]" : ""
              }`}
          >
            APY
          </div>
        </div>

        {selectedTab === "info" && (
          <>
            <div className="mt-[20px] mb-[40px]">
              <h2 className="text-[16px] text-primary font-500 mb-[12px]">
                {t("about")}
              </h2>
              <p className="text-[12px] font-500 text-[#535353]">
                {t("about-content")}
              </p>
            </div>
            <div className="w-full h-[1px] bg-[#EBEBEB] mb-[22px]" />
            <div className="flex items-center justify-between gap-[110px] mb-[45px] text-primary text-[18px] font-400">
              <div className="flex flex-col items-start ">
                <span className="mb-[17px]">{t("earn")}</span>
                <div className="flex items-center gap-[2px]">
                  <Image src={"/tether.png"} width={18} height={18} alt="eth" />
                  <p className="font-500">USDT</p>
                </div>
              </div>
              <div className="flex flex-col items-start ">
                <span className="mb-[17px]">TVL</span>
                <p className="font-500">$54.34M</p>
              </div>
              <div className="flex flex-col items-start ">
                <span className="mb-[17px]">{t("protocol")}</span>
                <div className="flex items-center gap-[2px]">
                  <Image src={"/aave.png"} width={18} height={18} alt="aave" />
                  <p className="font-500 ml-[5px]">SHAMBHALA</p>
                </div>
              </div>
              <div className="flex flex-col items-start ">
                <span className="mb-[17px]">{t("network")}</span>
                <div className="flex items-center gap-[5px]">
                  <Image src={"/eth.svg"} width={18} height={18} alt="eth" />
                  <p className="font-500">{t("ethereum")}</p>
                </div>
              </div>
            </div>
            <Limit
              progress={(45 / 94) * 100}
              current={"$4.5M"}
              total={"$9.4M"}
            />
          </>
        )}

        {selectedTab === "apy" && <LineCharts />}

        {/* FAQ 部分 */}
        <div className="mb-8 mt-[47px]">
          <h2 className="text-lg font-bold mb-[40px]">{t("faq")}</h2>
          <div className="w-full h-[1px] bg-[#EBEBEB] mb-[44px]" />
          <div className="mb-[68px]">
            <h3 className="text-[18px] font-500 mb-[30px]">{`What's Aave? How does it work?`}</h3>
            <p className="text-[12px] text-[#535353]">{t("faq-content")}</p>
          </div>

          <div className="w-full h-[1px] bg-[#EBEBEB]" />

          <div className="mt-[50px]">
            <h3 className="text-[18px] font-500 mb-[30px]">{t("ave")}</h3>
            <p className="text-[12px] text-[#535353]">{t("ave-content")}</p>
          </div>
        </div>
      </div>

      <div className="w-1/3 flex flex-col items-center justify-center">
        <div className="flex items-center mb-[31px] border border-[1px] border-[#E2E2E2] rounded-[50px]">
          <div
            onClick={() => changeTab("invite")}
            className={`m-[2px] px-[66px] py-[13px] text-primary cursor-pointer ${selectedRedeem === "invite" ? "bg-[#f1f1f1] rounded-[50px]" : ""
              }`}
          >
            {t("invite")}
          </div>
          <div
            onClick={() => changeTab("redeem")}
            className={`m-[2px] px-[66px] py-[13px] text-primary cursor-pointer ${selectedRedeem === "redeem" ? "bg-[#f1f1f1] rounded-[50px]" : ""
              }`}
          >
            {t("redeem")}
          </div>
        </div>

        <div className="w-full bg-thirdary shadow-card rounded-card text-primary px-[28px] py-[33px]">
          <div className="text-[12px] font-500 text-[#929292] flex items-center justify-end mb-[5px]">
            {t("balance")}:
            {formattedBalance}
          </div>
          <InputBalance
            logo={"/tether.png"}
            coinName={"USDT"}
            rate={rate}
            type="asset"
            // @ts-ignore
            maxValue={balance?.decimals || 0}
            onChange={inputChange}
          />

          <div className="w-full flex flex-col items-center justify-around text-secondary font-500 mt-[14px] mb-[38px]">
            {selectedRedeem == "invite" ? (
              <>
                <div className="w-full flex items-center justify-between">
                  <span className="text-[12px]">Est.daily</span>
                  <span className="text-[14px] text-primary">
                    {dailyEarn} USDT
                  </span>
                </div>
                <div className="w-full flex items-center justify-between">
                  <span className="text-[12px]">Est.receive</span>
                  <span className="text-[14px] text-primary">
                    {totalEarn} USDT
                  </span>
                </div>
                <div className="w-full flex items-center justify-between">
                  <span className="text-[12px]">Est.Points reward</span>
                  <span className="text-[14px] text-primary">{points}</span>
                </div>
              </>
            ) : (
              <>
                <div className="w-full flex items-center justify-between">
                  <span className="text-[12px]">Your receive</span>
                  <div>
                    {receives.map((item) => (
                      <div className="text-[14px] text-primary" key={item}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {(step === 1 || step === 2) && (
              <>
                <div className="w-full h-[1px] bg-[#ededed] mt-[25px]"></div>
                <div className="mt-[12px] w-full flex items-center justify-between">
                  <span className="text-[12px]">{t("network")}</span>
                  <span className="text-[14px] text-primary">
                    {t("ethereum")}
                  </span>
                </div>
                {/* <div className="w-full flex items-center justify-between">
                  <span className="text-[12px]">Investment Loss</span>
                  <span className="text-[14px] text-primary">
                    {(rate * inputValue).toFixed(2)}
                  </span>
                </div> */}
              </>
            )}
          </div>

          {selectedRedeem == "invite" ? (
            <div
              onClick={() => handleInvest()}
              className="w-full h-[60px] flex items-center justify-center bg-primary text-thirdary text-[16px] font-600 rounded-[20px] button-hover capitalize"
            >
              {step == 0 ? (
                "Invest"
              ) : step == 1 ? (
                "Step 1 of 2 : Approve USDT"
              ) : step == 2 ? (
                <Loading text="Approving" type="asset" />
              ) : (
                <Loading text="Investing" type="asset" />
              )}
            </div>
          ) : (
            <div
              onClick={() => handleRedeem()}
              className="w-full h-[60px] flex items-center justify-center bg-primary text-thirdary text-[16px] font-600 rounded-[20px] button-hover capitalize"
            >
              {!busy ? "Redeem" : <Loading text="Redeeming" type="asset" />}
            </div>
          )}

          {/* {(step === 1 || step === 2) && (
            <>
              <div className="mt-[15px] mb-[24px] w-full py-[14px] flex items-center justify-center gap-[19px] border border-[#EBEBEB] border-solid">
                <div className="flex items-center text-[12px] font-500 text-primary gap-[5px]">
                  1. Approve
                  <Image src={"/usdc.png"} width={18} height={18} alt="usdc" />
                </div>
                <Image
                  src={"/right-arrow.svg"}
                  width={20}
                  height={10}
                  alt="arrow"
                />
                <div className="flex items-center text-[12px] font-500 text-primary gap-[5px]">
                  2. Invest
                  <Image src={"/aave.png"} width={18} height={18} alt="usdc" />
                </div>
              </div>
              {!isLoading ? (
                <div
                  className="w-full h-[60px] flex items-center justify-center bg-primary text-thirdary text-[16px] font-600 rounded-[20px] button-hover"
                >
                  Step 1 of 2 : Approve USDC
                </div>
              ) : (
                <Loading text={step === 2 ? 'Approving' : step === 3 ? 'Investing' : ''} type="asset" />
              )}
            </>
          )} */}
        </div>
      </div>
    </section>
  );
};

export default AssetSection;
