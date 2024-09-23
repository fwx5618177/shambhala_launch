import { FC, useState } from "react";
import CopyToClipboard from 'react-copy-to-clipboard';
import Image from 'next/image';

const Referral: FC<{ link: string }> = ({ link }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Display copy notification for 2 seconds
    };

    return (
        <div className="bg-thirdary w-full p-4 sm:px-8 sm:py-5 text-primary rounded-card shadow-tableCard flex flex-col justify-between">
            <div className='mb-4 sm:mb-6'>
                <h1 className='text-primary text-base sm:text-lg font-600'>Referral level</h1>
                <span className='text-[#AAAAAA] text-sm sm:text-base font-600'>Normal</span>
            </div>
            <div className='mt-2 sm:mt-4 mb-4 sm:mb-6'>
                <h1 className='mb-2 sm:mb-3 text-sm sm:text-base'>Referral link</h1>
                <div className="flex border border-primary w-full rounded-[15px] items-center">
                    {/* Referral link and copy button container */}
                    <div className="flex items-center justify-between px-2 sm:px-4 py-1 sm:py-2 w-1/2 truncate">
                        <span className="text-xs sm:text-sm font-400 whitespace-nowrap overflow-hidden overflow-ellipsis">
                            {link}
                        </span>
                        <CopyToClipboard text={link} onCopy={handleCopy}>
                            <Image src="/copy.svg" width={16} height={16} alt="copy" className="cursor-pointer" />
                        </CopyToClipboard>
                    </div>

                    {/* Invite Friends button container */}
                    <div className="bg-[#060606] flex items-center justify-center gap-2 sm:gap-3 px-2 sm:px-4 py-1 sm:py-2 rounded-r-[15px] w-1/2">
                        <Image src="/add.svg" width={25} height={16} alt="add" />
                        <span className="text-thirdary text-xs sm:text-sm font-600 whitespace-nowrap">
                            Invite Friends
                        </span>
                    </div>
                </div>
                {isCopied && <span className="text-success mt-2 text-xs sm:text-sm">Referral link copied!</span>}
            </div>
        </div>
    );
}

export default Referral;