import React, { FC, useState } from 'react';

interface LimitProps {
    progress: number;
    current: string;
    total: string;
}

const Limit: FC<LimitProps> = ({ progress, current, total }) => {
    return (
        <div className='w-full'>
            <div className='h-[82px] px-[21px] py-[13px] mb-[10px] border-[1px] border-solid border-[#EBEBEB] text-primary text-[16px] font-500'>
                <div className='flex items-center justify-between mb-[17px]'>
                    <span>Supply Limit</span>
                    <span>{`${current}/${total}`}</span>
                </div>

                <div className='relative bg-[#EBEBEB] h-[10px] w-full'>
                    <div className='absolute left-0 h-full bg-primary' style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            <span className='ml-[20px] text-[16px] font-600'>Utilization rate: {progress.toFixed(2)} %</span>
        </div>
    )
}

export default Limit;