import React from 'react';
import Image from 'next/image';
import InputBalance from '@/components/InputBalance';

interface InputCardProps {
    logo: string;
    coinName: string;
    rate: number;
    network: string;
}

const InputCard: React.FC<InputCardProps> = ({ logo, coinName, rate, network }) => {
    return (
        <div className="w-full h-[312px] bg-market-card-bg shadow-card p-4 rounded-card mb-[6px] text-primary">
            {/* 输入和余额部分 */}
            <InputBalance logo={logo} coinName={coinName} rate={rate} maxValue={100} />

            {/* 估计收益和奖励部分 */}
            <div className='w-full flex flex-col items-center justify-around text-secondary font-500 px-[52px]'>
                <div className='w-full flex items-center justify-between'>
                    <span className='text-[12px]'>Est.daily</span>
                    <span className='text-[14px] text-primary'>{(rate * 1).toFixed(2)} USDT</span>
                </div>
                <div className='w-full flex items-center justify-between'>
                    <span className='text-[12px]'>Est.receive</span>
                    <span className='text-[14px] text-primary'>{(rate * 1).toFixed(2)}</span>
                </div>
                <div className='w-full flex items-center justify-between'>
                    <span className='text-[12px]'>Est.Points reward</span>
                    <span className='text-[14px] text-primary'>{(rate * 1).toFixed(2)}</span>
                </div>
            </div>

            {/* 分隔线 */}
            <div className="w-full h-[1px] bg-[#ededed] mt-[25px]"></div>

            {/* 网络信息 */}
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