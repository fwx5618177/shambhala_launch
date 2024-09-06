import React, { FC, useState } from 'react';
import Image from 'next/image';
import moment from 'moment';

import Table from '@/components/Table';
import { useRouter } from 'next/router';

const dataSource = [
    {
        protocol: { src: '/fluid.svg', alt: 'Fluid', label: 'Fluid', size: 40 },
        network: { src: '/eth.svg', alt: 'Ethereum', label: 'Ethereum', size: 16 },
        amount: { fusdt: 2.017, usdt: -70.54 },
        investedProducts: '2',
        assets: '$7.73',
        date: Date.now(),
    },
    {
        protocol: { src: '/fluid.svg', alt: 'Fluid', label: 'Fluid', size: 40 },
        network: { src: '/eth.svg', alt: 'Ethereum', label: 'Ethereum', size: 16 },
        amount: { fusdt: 2.017, usdt: -70.54 },
        investedProducts: '2',
        assets: '$7.73',
        date: Date.now(),
    },
    {
        protocol: { src: '/fluid.svg', alt: 'Fluid', label: 'Fluid', size: 40 },
        network: { src: '/eth.svg', alt: 'Ethereum', label: 'Ethereum', size: 16 },
        amount: { fusdt: 2.017, usdt: -70.54 },
        investedProducts: '2',
        assets: '$7.73',
        date: Date.now(),
    },
];

interface PortfolioSectionProps {
    type: 'list' | 'detail';
}

const PortfolioSection: FC<PortfolioSectionProps> = ({ type }) => {
    const [activeTab, setActiveTab] = useState<'defi' | 'transactions'>('defi');
    const router = useRouter();
    const { name } = router.query;

    const handleTabSwitch = (tab: 'defi' | 'transactions') => {
        setActiveTab(tab);
    };

    const handleUpdate = () => { }

    const columns = [
        {
            title: 'Protocol',
            dataIndex: 'protocol',
            key: 'protocol',
            render: (value: any) => (
                <div className="flex items-center space-x-4">
                    <Image src={value.src} alt={value.alt} width={value.size || 40} height={value.size || 40} />
                    <span>{value.label}</span>
                </div>
            ),
        },
        {
            title: 'Network',
            dataIndex: 'network',
            key: 'network',
            render: (value: any) => (
                <div className="flex items-center space-x-2">
                    <Image src={value.src} alt={value.alt} width={value.size || 16} height={value.size || 16} />
                    <span>{value.label}</span>
                </div>
            ),
        },
    ];

    if (activeTab === 'transactions') {
        columns.push(...[
            {
                title: (
                    <span className='flex items-center justify-end'>Amount</span>
                ),
                dataIndex: 'amount',
                key: 'amount',
                render: (value: any) => (
                    <div className="w-full flex flex-col items-end justify-center gap-[2px]">
                        <span className="text-success text-coinSm font-500">
                            {value.fusdt} FUSDT
                        </span>
                        <span className="text-secondary text-[13px] font-500">
                            {value.usdt} USDT
                        </span>
                    </div>
                ),
            },
            {
                title: (
                    <span className='flex items-center justify-end'>Date</span>
                ),
                dataIndex: 'date',
                key: 'date',
                render: (value: any) => (
                    <span className='w-full text-secondary flex items-center justify-end'>{moment(value).format('YYYY/MM/DD HH:mm')}</span>
                ),
            },
        ] as any);
    } else if (activeTab === 'defi') {
        columns.push(...[
            {
                title: 'Invested products',
                dataIndex: 'investedProducts',
                key: 'investedProducts',
            },
            {
                title: 'Assets',
                dataIndex: 'assets',
                key: 'assets',
            },
        ] as any)
    }


    return (
        <section className="bg-bg-primary w-full h-screen py-[135px] px-[105px]">
            {type === 'list' && <><h1 className="text-lg font-800 text-primary mb-[85px]">My portfolio</h1><div className="w-full flex justify-start space-x-[260px] text-[24px] font-600 border-b border-[#EBEBEB]">
                <div
                    className={`px-2 py-2 text-center cursor-pointer ${activeTab === 'defi' ? 'border-b border-primary' : 'bg-white'}`}
                    onClick={() => handleTabSwitch('defi')}
                >
                    Defi
                </div>
                <div
                    className={`px-4 py-2 text-center cursor-pointer ${activeTab === 'transactions' ? 'border-b border-primary' : 'bg-white'}`}
                    onClick={() => handleTabSwitch('transactions')}
                >
                    Transactions
                </div>
            </div></>}

            {type === 'detail' && (
                <><div className='text-lg font-800 text-primary mb-[85px] flex items-center justify-start gap-[5px] capitalize'>
                    <Image src={`/${name}.svg`} alt='Fluid' width={50} height={50} />
                    <span className='ml-[10px]'>{name}</span>
                    <div className='ml-[10px] w-[1px] h-[30px] bg-[#929292]'></div>
                    <div className="ml-[10px] flex items-center space-x-2 text-coinSm text-[#929292]">
                        <Image src={'/eth.svg'} alt='Ethereum' width={16} height={16} />
                        <span>Ethereum</span>
                    </div>
                </div>
                    <div className='mt-[46px] flex flex-col items-start text-primary'>
                        <span className='text-[14px] font-400'>Total Assets</span>
                        <div className='w-full flex items-center justify-between'>
                            <span className='text-[24px] font-800'>$27.78</span>
                            <p className='text-[14px] font-500 text-[#929292] flex items-center justify-center'>Data updated <span className='text-primary'>1 minute</span> ago <Image src={'/scroll.svg'} width={24} height={24} alt='Scroll' className='cursor-pointer' onClick={handleUpdate} /></p>
                        </div>
                    </div>
                    <div className='my-[52px]'>Vaults</div>
                </>
            )}

            <div className="my-[50px]">
                <Table columns={columns} dataSource={dataSource} type={activeTab === 'transactions' ? 'card' : 'normal'} />
            </div>
        </section>
    );
};

export default PortfolioSection;