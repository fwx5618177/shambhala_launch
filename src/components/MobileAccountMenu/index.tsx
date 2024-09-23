import Image from "next/image";
import React, { FC } from "react";
import { FaCopy, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface MobileAccountMenuProps {
    address: string | undefined;
    onClose: () => void;
    handleDisconnect: () => void;
    handleCopy: () => void;
    isCopied: boolean;
}

const MobileAccountMenu: FC<MobileAccountMenuProps> = ({
    address,
    onClose,
    handleDisconnect,
    handleCopy,
    isCopied,
}) => {
    const { t } = useTranslation("common");
    const router = useRouter();

    return (
        <>
            {/* 灰色遮罩层 */}
            <div
                className="fixed inset-0 bg-black opacity-50 z-40"
                onClick={onClose}
            ></div>

            {/* Mobile Account Menu */}
            <div className="fixed bottom-0 left-0 w-full h-[30%] bg-white text-black z-50 p-4 rounded-t-xl flex flex-col space-y-3 border-t border-gray-300 shadow-lg">
                <div className="flex justify-between items-center pb-2 mb-2">
                    <h2 className="text-lg font-bold">{t("My Wallet")}</h2>
                    <FaTimes size={20} className="cursor-pointer text-gray-500 hover:text-gray-700" onClick={onClose} />
                </div>

                <ul className="text-base text-gray-800">
                    <CopyToClipboard text={address || ""} onCopy={handleCopy}>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between rounded-md border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <Image src="/user-icon.svg" alt="User" width={20} height={20} />
                                <span className="truncate">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                            </div>
                            {isCopied ? (
                                <span className="text-green-500 text-xs">{t("copied")}</span>
                            ) : (
                                <FaCopy size={16} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                            )}
                        </li>
                    </CopyToClipboard>
                    <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between rounded-md"
                        onClick={handleDisconnect}
                    >
                        <div className="flex items-center gap-2">
                            <Image src="/disconnect.svg" alt="Disconnect" width={20} height={20} />
                            <span className="text-sm">{t("disconnect")}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default MobileAccountMenu;