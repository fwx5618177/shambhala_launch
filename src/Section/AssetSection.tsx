import React, { useState } from 'react';
import Image from 'next/image';
import Limit from '@/components/Limit';
import InputBalance from '@/components/InputBalance';
import LineCharts from '@/components/LineCharts';
import Loading from '@/components/Loading';

const AssetSection = () => {
    const [selectedTab, setSelectedTab] = useState<'info' | 'apy'>('info');
    const [selectedRedeem, setSelectedRedeem] = useState<'invite' | 'redeem'>('invite');
    const [inputValue, setInputValue] = useState<number>(0.0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [step, setStep] = useState<number>(0);
    const rate = 1;

    const handleInvest = () => {
        setStep(1);
    }

    const handleApprove = () => {
        // Mock
        setIsLoading(true);

        setInterval(() => {
            setIsLoading(false);
        }, 5000);
    }

    return (
        <section className="w-full bg-thirdary flex items-start pt-[86px] px-[109px]">
            <div className="max-w-[720px] w-2/3 mr-[52px] text-primary mb-[232px]">
                <div className="mb-4 flex items-center justify-between">
                    <div className='flex justify-center items-between space-x-4'>
                        <div className="relative mr-2">
                            <Image
                                src={'/tether.png'}
                                alt={'tether'}
                                width={60}
                                height={60}
                                className="rounded-coin"
                            />
                            <Image
                                src={'/aave.png'}
                                alt={'aave'}
                                width={30}
                                height={30}
                                className="absolute bottom-0 right-normal"
                            />
                        </div>
                        <div>
                            <h1 className="text-coinLg font-500">USDT</h1>
                            <p className="text-coinSm text-secondary font-400">Aave V3</p>
                        </div>
                    </div>

                    <div className='flex flex-col items-center'>
                        <div className="flex items-baseline justify-between font-600 gap-2">
                            <span className='text-[42px] flex justify-end'>9.47%</span>
                            <span className='text-coinSm'>APY</span>
                        </div>
                        <div className="bg-manturity text-primary px-[9px] py-[5px] rounded-[2px] text-coinSm">Maturity: 24/09/10</div>
                    </div>
                </div>

                <div className="flex space-x-6 mb-8">
                    <div onClick={() => setSelectedTab('info')} className={`px-[24px] py-[10px] text-primary cursor-pointer ${selectedTab === 'info' ? 'bg-[#f1f1f1] rounded-[50px]' : ''}`}>Info</div>
                    <div onClick={() => setSelectedTab('apy')} className={`px-[24px] py-[10px] text-primary cursor-pointer ${selectedTab === 'apy' ? 'bg-[#f1f1f1] rounded-[50px]' : ''}`}>APY</div>
                </div>

                {selectedTab === 'info' && (<><div className="mt-[20px] mb-[40px]">
                    <h2 className="text-[16px] text-primary font-500 mb-[12px]">About</h2>
                    <p className="text-[12px] font-500 text-[#535353]">
                        We want to build a global, trustless financial ecosystem that enables users to freely manage and trade their assets without relying on traditional financial institutions. Through continuous innovation and improvement, we are committed to providing secure and user-friendly DeFi products that drive the widespread adoption of blockchain technology.
                    </p>
                </div><div className='w-full h-[1px] bg-[#EBEBEB] mb-[22px]' /><div className='flex items-center justify-between gap-[110px] mb-[45px] text-primary text-[18px] font-400'>
                        <div className='flex flex-col items-start '>
                            <span className='mb-[17px]'>Earn</span>
                            <div className="flex items-center gap-[2px]">
                                <Image src={'/usdc.png'} width={18} height={18} alt='eth' />
                                <p className="font-500">USDC</p>
                            </div>
                        </div>
                        <div className='flex flex-col items-start '>
                            <span className='mb-[17px]'>TVL</span>
                            <p className="font-500">$54.34M</p>
                        </div>
                        <div className='flex flex-col items-start '>
                            <span className='mb-[17px]'>Protocol</span>
                            <div className="flex items-center gap-[2px]">
                                <Image src={'/aave.png'} width={18} height={18} alt='aave' />
                                <p className="font-500 ml-[5px]">Aave V3</p>
                            </div>
                        </div>
                        <div className='flex flex-col items-start '>
                            <span className='mb-[17px]'>Network</span>
                            <div className="flex items-center gap-[5px]">
                                <Image src={'/eth.svg'} width={18} height={18} alt='eth' />
                                <p className="font-500">Ethereum</p>
                            </div>
                        </div>
                    </div><Limit progress={45 / 94 * 100} current={'$4.5M'} total={'$9.4M'} /></>)}

                {selectedTab === 'apy' && (<LineCharts />)}

                {/* FAQ 部分 */}
                <div className="mb-8 mt-[47px]">
                    <h2 className="text-lg font-bold mb-[40px]">FAQ</h2>
                    <div className='w-full h-[1px] bg-[#EBEBEB] mb-[44px]' />
                    <div className="mb-[68px]">
                        <h3 className="text-[18px] font-500 mb-[30px]">{`What's Aave? How does it work?`}</h3>
                        <p className="text-[12px] text-[#535353]">
                            ave is a decentralized finance (DeFi) protocol that allows users to borrow and lend cryptocurrencies without the need for an intermediary. It runs on blockchains like Ethereum, making it possible for anyone to conduct financial transactions through smart contracts. The main function of Aave is to provide liquidity pools in which users can deposit crypto assets to earn interest, or borrow from them to pay interest.
                        </p>
                    </div>

                    <div className='w-full h-[1px] bg-[#EBEBEB]' />

                    <div className='mt-[50px]'>
                        <h3 className="text-[18px] font-500 mb-[30px]">{`What's Aave? How does it work?`}</h3>
                        <p className="text-[12px] text-[#535353]">
                            ave is a decentralized finance (DeFi) protocol that allows users to borrow and lend cryptocurrencies without the need for an intermediary. It runs on blockchains like Ethereum, making it possible for anyone to conduct financial transactions through smart contracts. The main function of Aave is to provide liquidity pools in which users can deposit crypto assets to earn interest, or borrow from them to pay interest.
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-1/3 flex flex-col items-center justify-center">
                <div className="flex items-center mb-[31px] border border-[1px] border-[#E2E2E2] rounded-[50px]">
                    <div onClick={() => setSelectedRedeem('invite')} className={`m-[2px] px-[66px] py-[13px] text-primary cursor-pointer ${selectedRedeem === 'invite' ? 'bg-[#f1f1f1] rounded-[50px]' : ''}`}>Invite</div>
                    <div onClick={() => setSelectedRedeem('redeem')} className={`m-[2px] px-[66px] py-[13px] text-primary cursor-pointer ${selectedRedeem === 'redeem' ? 'bg-[#f1f1f1] rounded-[50px]' : ''}`}>Redeem</div>
                </div>

                <div className="w-full bg-thirdary shadow-card rounded-card text-primary px-[28px] py-[33px]">
                    <div className='text-[12px] font-500 text-[#929292] flex items-center justify-end mb-[5px]'>balance: 0</div>
                    <InputBalance logo={'/usdc.png'} coinName={'USDC'} rate={rate} type='asset' maxValue={100} onChange={value => {
                        setInputValue(value);
                    }} />

                    <div className='w-full flex flex-col items-center justify-around text-secondary font-500 mt-[14px] mb-[38px]'>
                        <div className='w-full flex items-center justify-between'>
                            <span className='text-[12px]'>Est.daily</span>
                            <span className='text-[14px] text-primary'>{(rate * inputValue).toFixed(2)} USDT</span>
                        </div>
                        <div className='w-full flex items-center justify-between'>
                            <span className='text-[12px]'>Est.receive</span>
                            <span className='text-[14px] text-primary'>{(rate * inputValue).toFixed(2)}</span>
                        </div>
                        <div className='w-full flex items-center justify-between'>
                            <span className='text-[12px]'>Est.Points reward</span>
                            <span className='text-[14px] text-primary'>{(rate * inputValue).toFixed(2)}</span>
                        </div>

                        {step === 1 && (<><div className="w-full h-[1px] bg-[#ededed] mt-[25px]"></div><div className='mt-[12px] w-full flex items-center justify-between'>
                            <span className='text-[12px]'>Network</span>
                            <span className='text-[14px] text-primary'>Ethereum</span>
                        </div><div className='w-full flex items-center justify-between'>
                                <span className='text-[12px]'>Investment Loss</span>
                                <span className='text-[14px] text-primary'>{(rate * inputValue).toFixed(2)}</span>
                            </div></>)}
                    </div>

                    {step === 0 && (<div onClick={() => handleInvest()} className="w-full h-[60px] flex items-center justify-center bg-primary text-thirdary text-[16px] font-600 rounded-[20px] button-hover capitalize">
                        {selectedRedeem}
                    </div>)}

                    {step === 1 && (
                        <>
                            <div className='mt-[15px] mb-[24px] w-full py-[14px] flex items-center justify-center gap-[19px] border border-[#EBEBEB] border-solid'>
                                <div className='flex items-center text-[12px] font-500 text-primary gap-[5px]'>1. Approve
                                    <Image src={'/usdc.png'} width={18} height={18} alt='usdc' />
                                </div>
                                <Image src={'/right-arrow.svg'} width={20} height={10} alt='arrow' />
                                <div className='flex items-center text-[12px] font-500 text-primary gap-[5px]'>2. Invest
                                    <Image src={'/aave.png'} width={18} height={18} alt='usdc' />
                                </div>
                            </div>
                            {!isLoading ?
                                (<div onClick={handleApprove} className="w-full h-[60px] flex items-center justify-center bg-primary text-thirdary text-[16px] font-600 rounded-[20px] button-hover">
                                    Step 1 of 2 : Approve USDC
                                </div>)
                                : <Loading text={selectedRedeem} type='asset' />}
                        </>
                    )}
                </div>
            </div>
        </section >
    );
};

export default AssetSection;