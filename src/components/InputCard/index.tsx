import React, { useState } from 'react';
import Image from 'next/image';

interface InputCardProps {
    logo: string;
    coinName: string;
    rate: number;
    network: string;
}

const InputCard: React.FC<InputCardProps> = ({ logo, coinName, rate, network }) => {
    const [inputValue, setInputValue] = useState('0.00'); // 默认输入值
    const [calculatedValue, setCalculatedValue] = useState(0); // 计算后的值

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        // 将输入的值转换为数字并乘以 rate
        const numericValue = parseFloat(value) || 0; // 如果解析失败，则默认为 0
        setCalculatedValue(numericValue * rate);
    };

    return (
        <div className="w-full h-[312px] bg-market-card-bg shadow-card p-4 rounded-card mb-[6px] text-primary">
            <div className="mx-[20px] my-[24px] bg-thirdary h-[117px] rounded-[20px] flex items-center justify-between">
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
                <div className="bg-market-card-bg rounded-[10px] w-[142px] h-[50px] mr-[36px] flex items-center justify-between px-[12px]">
                    <Image
                        src={logo}
                        alt={coinName}
                        width={40}
                        height={40}
                        className="rounded-coin"
                    />
                    <span className="text-[22px] font-500">{coinName}</span>
                </div>
            </div>

            <div className='w-full flex flex-col items-center justify-around text-secondary font-500 px-[52px]'>
                <div className='w-full flex items-center justify-between'>
                    <span className='text-[12px]'>Est.daily</span>
                    <span className='text-[14px] text-primary'>{calculatedValue.toFixed(2)} USDT</span>
                </div>
                <div className='w-full flex items-center justify-between'>
                    <span className='text-[12px]'>Est.receive</span>
                    <span className='text-[14px] text-primary'>{calculatedValue.toFixed(2)}</span>
                </div>
                <div className='w-full flex items-center justify-between'>
                    <span className='text-[12px]'>Est.Points reward</span>
                    <span className='text-[14px] text-primary'>{calculatedValue.toFixed(2)}</span>
                </div>
            </div>

            <div className="w-full h-[1px] bg-[#ededed] mt-[25px]"></div>
            <div className='mt-[12px] flex items-center justify-between text-secondary px-[52px]'>
                <span className='text-[12px]'>Network</span>
                <div className="flex items-center gap-[2px]">
                    <Image src={'/eth.svg'} width={16} height={16} alt='eth' />
                    <p className="text-primary text-desc font-500">{network}</p>
                </div>
            </div>
        </div>
    );
};

export default InputCard;