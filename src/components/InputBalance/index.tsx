import React, { FC, useState } from "react";
import Image from "next/image";

interface InputBalanceProps {
  logo: string;
  coinName: string;
  rate: number; // rate 是需要传递的
  maxValue: number; // 最大值
  type?: "invest" | "asset";
  onChange?: (value: number) => void;
}

const InputBalance: FC<InputBalanceProps> = ({
  logo,
  coinName,
  rate,
  maxValue,
  type,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState("0.00"); // 默认输入值
  const [calculatedValue, setCalculatedValue] = useState(0); // 计算后的值

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onChange && onChange(Number(value));

    // 将输入的值转换为数字并乘以 rate
    const numericValue = parseFloat(value) || 0; // 如果解析失败，则默认为 0
    setCalculatedValue(numericValue * rate);
  };

  const handleMaxClick = () => {
    setInputValue(maxValue?.toString());
    setCalculatedValue(maxValue * rate);
  };

  return (
    <div
      className={`h-auto sm:h-[117px] rounded-[10px] sm:rounded-[20px] flex sm:flex-row items-start sm:items-center justify-between p-4 sm:p-0 ${
        type === "asset"
          ? "bg-market-card-bg"
          : "bg-thirdary mx-2 sm:mx-[20px] my-2 sm:my-[24px]"
      }`}
    >
      <div className="flex flex-col items-start w-full sm:ml-[29px]">
        {/* 输入框 */}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="text-base sm:text-coinLg bg-transparent border-none outline-none w-full"
          placeholder="0.00"
        />
        {/* 计算并显示的值 */}
        <p className="text-[10px] sm:text-[12px] text-secondary">
          ${calculatedValue.toFixed(2)}
        </p>
      </div>
      {type === "asset" ? (
        <div className="flex items-center mt-2 sm:mt-0">
          <div
            className={`bg-thirdary rounded-[10px] w-auto h-[40px] sm:h-[50px] mr-0 sm:mr-[36px] flex items-center justify-between px-2 sm:px-[12px] whitespace-nowrap`}
          >
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Image
                src={logo}
                alt={coinName}
                width={24} // 根据需要调整大小以适应屏幕
                height={24} // 根据需要调整大小以适应屏幕
                className="rounded-coin flex-shrink-0"
              />
              <span className="text-[14px] sm:text-[18px] font-500 truncate">
                {coinName}
              </span>
            </div>
          </div>
          <div
            className="mt-2 sm:mt-0 px-3 sm:px-[12px] py-[2px] sm:py-[5px] rounded-[10px] sm:rounded-[20px] text-[12px] sm:text-[14px] bg-primary text-thirdary cursor-pointer"
            onClick={handleMaxClick}
          >
            Max
          </div>
        </div>
      ) : (
        <div
          className={`bg-market-card-bg rounded-[10px] p-[10px] sm:p-[12px] flex items-center justify-between w-3/4 mr-0 sm:mr-[36px] mt-2 sm:mt-0`}
        >
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Image
              src={logo}
              alt={coinName}
              width={24} // 根据需要调整大小以适应屏幕
              height={24} // 根据需要调整大小以适应屏幕
              className="rounded-coin flex-shrink-0"
            />
            <span className="text-[14px] sm:text-[18px] font-500 truncate">
              {coinName}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputBalance;
