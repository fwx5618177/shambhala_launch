import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import InputBalance from "@/components/InputBalance";
import moment from "moment";
import { formatUsdt } from "@/utils/formatUsdt";

interface InputCardProps {
  logo: string;
  coinName: string;
  rate: number;
  network: string;
  apy: number;
  cycle: number;
  maturity: string;
  fixedDuration: number;
  onChange: (value: number) => void;
}

const InputCard: React.FC<InputCardProps> = ({
  logo,
  coinName,
  rate,
  network,
  apy,
  cycle,
  maturity,
  fixedDuration,
  onChange,
}) => {
  const [dailyEarn, setDailyEarn] = useState<string>("0");
  const [totalEarn, setTotalEarn] = useState<string>("0");

  // 计算 maturity 和 cycle 的差值天数
  const daysUntilMaturity = useMemo(() => {
    return moment(maturity).diff(moment(), "days");
  }, [maturity]);

  // 根据 cycle 计算 Points
  const points = useMemo(() => {
    return parseInt(((100 / cycle) * daysUntilMaturity).toString()) || 0;
  }, [cycle, daysUntilMaturity]);

  // 输入变更时的逻辑
  const inputChange = useCallback(
    (value: number) => {
      const formattedValue = value || 0;
      const apyFactor = (apy || 0) / 1000000;
      const daily =
        fixedDuration === 0
          ? (formattedValue * apyFactor) / 365
          : (formattedValue * 6646 * apyFactor) / cycle;

      const total =
        fixedDuration === 0
          ? (formattedValue * cycle * apyFactor) / (365 * 6646) + formattedValue
          : formattedValue * apyFactor + formattedValue;

      setDailyEarn(formatUsdt(daily, 4));
      setTotalEarn(formatUsdt(total, 4));

      if (onChange) onChange(value);
    },
    [apy, cycle, fixedDuration, onChange]
  );

  return (
    <div className="w-full h-[312px] bg-market-card-bg shadow-card p-4 rounded-card mb-[6px] text-primary">
      {/* 输入和余额部分 */}
      <InputBalance
        logo={logo}
        coinName={coinName}
        rate={rate}
        maxValue={100}
        onChange={inputChange}
      />

      {/* 估计收益和奖励部分 */}
      <div className="w-full flex flex-col items-center justify-around text-secondary font-500 px-[52px]">
        <div className="w-full flex items-center justify-between">
          <span className="text-[12px]">Est.daily</span>
          <span className="text-[14px] text-primary">{dailyEarn} USDT</span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="text-[12px]">Est.receive</span>
          <span className="text-[14px] text-primary">{totalEarn} USDT</span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="text-[12px]">Est.Points reward</span>
          <span className="text-[14px] text-primary">{points}</span>
        </div>
      </div>

      {/* 分隔线 */}
      <div className="w-full h-[1px] bg-[#ededed] mt-[25px]"></div>

      {/* 网络信息 */}
      <div className="mt-[12px] flex items-center justify-between text-secondary px-[52px]">
        <span className="text-[12px]">Network</span>
        <div className="flex items-center gap-[2px]">
          <Image src={"/eth.svg"} width={16} height={16} alt="eth" />
          <p className="text-primary text-desc font-500">{network}</p>
        </div>
      </div>
    </div>
  );
};

export default InputCard;
