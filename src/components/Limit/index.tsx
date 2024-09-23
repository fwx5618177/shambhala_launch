import React, { FC } from 'react';

interface LimitProps {
    progress: number;
    current: string;
    total: string;
    title?: string;
    footer?: boolean;
}

const Limit: FC<LimitProps> = ({ progress, current, total, title = 'Supply Limit', footer = true }) => {
    return (
        <div className='w-full'>
            <div className='h-[60px] sm:h-[70px] md:h-[82px] px-4 sm:px-[16px] md:px-[21px] py-2 sm:py-3 md:py-[13px] mb-2 sm:mb-3 md:mb-[10px] border border-solid border-[#EBEBEB] text-primary text-sm sm:text-[15px] md:text-[16px] font-500'>
                <div className='flex items-center justify-between mb-2 sm:mb-3 md:mb-[17px]'>
                    <span>{title}</span>
                    <span className='text-xs sm:text-sm md:text-base'>{`${current}/${total}`}</span>
                </div>

                <div className='relative bg-[#EBEBEB] h-[6px] sm:h-[8px] md:h-[10px] w-full'>
                    <div className='absolute left-0 h-full bg-primary' style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            {footer && <span className='ml-4 sm:ml-5 md:ml-[20px] text-xs sm:text-sm md:text-[16px] font-600'>Utilization rate: {progress.toFixed(2)} %</span>}
        </div>
    )
}

export default Limit;