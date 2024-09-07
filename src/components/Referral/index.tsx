import { FC, useState } from "react";
import CopyToClipboard from 'react-copy-to-clipboard';
import Image from 'next/image';

const Referral: FC<{ link: string }> = ({ link }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // 提示2秒后消失
    };


    return <div className="bg-thirdary w-full px-[50px] py-[10px] text-primary rounded-card shadow-tableCard flex flex-col justify-between">
        <div className='mb-[30px]'>
            <h1 className='text-primary text-[20px] font-600'>Referral level</h1>
            <span className='text-[#AAAAAA] text-[18px] font-600'>Normal</span>
        </div>
        <div className='mt-[12px] mb-[30px]'>
            <h1 className='mb-[12px]'>Referral link</h1>
            <div className="flex border border-primary w-full rounded-[15px]">
                <div className="px-[26px] py-[5px] flex items-center justify-between w-full">
                    <span className="text-[15px] font-400 whitespace-nowrap">
                        {link}
                    </span>
                    <CopyToClipboard text={link} onCopy={handleCopy}>
                        <Image src="/copy.svg" width={20} height={20} alt="copy" className="cursor-pointer" />
                    </CopyToClipboard>
                </div>
                <div className="bg-[#060606] rounded-r-[15px] flex items-center justify-center gap-[8px] px-[30px] whitespace-nowrap">
                    <Image src="/add.svg" width={35} height={20} alt="add" />
                    <span className="text-thirdary text-[14px] font-600">Invite Friends</span>
                </div>
            </div>
            {isCopied && <span className="text-success mt-2 text-[12px]">Referral link copied!</span>}
        </div>
    </div>
}

export default Referral;