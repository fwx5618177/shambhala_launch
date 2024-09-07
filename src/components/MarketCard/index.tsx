import React from "react";
import Image from "next/image";
import InputCard from "../InputCard";

import { USDT_ERC20, USDTVAULT_ERC20 } from "@/commons/config.ts";

import { config } from "@/wagmi.ts";

import {
  readContract,
  writeContract,
  watchContractEvent,
  watchChainId,
  getBlockNumber,
  getTransaction,
  getTransactionReceipt,
  getAccount,
} from "@wagmi/core";

interface MarketCardProps {
  logo: string;
  subLogo: string;
  coinName: string;
  apy: string;
  tvl: string;
  network: string;
  date?: string;
  rate?: number;
}

const MarketCard: React.FC<MarketCardProps> = ({
  logo,
  subLogo,
  coinName,
  apy,
  tvl,
  network,
  date,
  rate,
}) => {
  const pid = 0;

  function getPoolInfo() {
    return readContract(config, {
      abi: USDTVAULT_ERC20.abi,
      address: USDTVAULT_ERC20.address,
      functionName: "pools",
      args: [pid],
    });
  }

  function queryBalance() {
    const account = getAccount();
    console.log("account", account);
    return readContract(config, {
      abi: USDT_ERC20.abi,
      address: USDT_ERC20.address,
      functionName: "balanceOf",
      args: [account.address],
    });
  }

  async function handleInvest() {
    console.log("handle invest");
    const poolState = await getPoolInfo();
    console.log("pool state", poolState);
    const balance = await queryBalance();
  }
  return (
    <div className="w-[500px] h-[473px]">
      <div className="w-full h-[90px] px-4 flex justify-between items-center mb-[5px] bg-market-card-bg rounded-card shadow-card text-primary">
        {/* 第一个部分 */}
        <div className="flex items-center">
          <div className="relative mr-2">
            <Image
              src={logo}
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
            <h3 className="text-coinXl">{apy}</h3>
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
          <p className="text-desc text-secondary">Date: {date}</p>
        </div>
      </div>
      <InputCard
        logo={logo}
        coinName={coinName}
        rate={rate || 1}
        network={network}
      />
      <div
        onClick={handleInvest}
        className="w-full h-[60px] flex items-center justify-center bg-primary text-thirdary text-[16px] font-600 rounded-[20px] button-hover"
      >
        Invest
      </div>
    </div>
  );
};

export default MarketCard;
