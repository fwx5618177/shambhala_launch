import React, { FC, useState, useEffect } from 'react';
import Image from 'next/image';

interface InputBalanceProps {
    logo: string;
    coinName: string;
    rate: number; // rate 是需要传递的
    maxValue: number; // 最大值
    type?: 'invest' | 'asset';
    onChange?: (value: number) => void;
}

const InputBalance: FC<InputBalanceProps> = ({ logo, coinName, rate, maxValue, type, onChange }) => {
    const [inputValue, setInputValue] = useState('0.00'); // 默认输入值
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
        <div className={`h-[117px] rounded-[20px] flex items-center justify-between ${type === 'asset' ? 'bg-market-card-bg' : 'bg-thirdary mx-[20px] my-[24px]'}`}>
            <div className="flex flex-col items-start ml-[29px]">
                {/* 输入框 */}
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="text-coinLg bg-transparent border-none outline-none w-full"
                    placeholder="0.00"
                />
                {/* 计算并显示的值 */}
                <p className="text-[12px] text-secondary">${calculatedValue.toFixed(2)}</p>
            </div>
            {
                type === 'asset' ? (<div className='flex flex-col items-center'>
                    <div className={`bg-thirdary rounded-[10px] w-[142px] h-[50px] mr-[36px] flex items-center justify-between px-[12px]`}>
                        <Image
                            src={logo}
                            alt={coinName}
                            width={40}
                            height={40}
                            className="rounded-coin"
                        />
                        <span className="text-[22px] font-500">{coinName}</span>
                    </div>
                    <div className='mt-[12px] px-[12px] py-[5px] rounded-[20px] text-[14px] bg-primary text-thirdary cursor-pointer' onClick={handleMaxClick}>Max</div>
                </div>) : (
                    <>
                        <div className={`bg-market-card-bg rounded-[10px] w-[142px] h-[50px] mr-[36px] flex items-center justify-between px-[12px]`}>
                            <Image
                                src={logo}
                                alt={coinName}
                                width={40}
                                height={40}
                                className="rounded-coin"
                            />
                            <span className="text-[22px] font-500">{coinName}</span>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default InputBalance;