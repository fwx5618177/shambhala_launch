import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import React, { useState } from "react";
import Image from "next/image";

const WalletButton: React.FC = () => {
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const handleDisconnect = () => {
        disconnect(); // 断开连接
        setIsMenuOpen(false); // 关闭菜单
    };

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev); // 切换菜单显示状态
    };

    return (
        <div className="relative flex items-center space-x-2">
            {isConnected ? (
                <div className="flex items-center space-x-2 bg-bannerBg text-thirdary px-4 py-2 rounded-full mr-[20px] cursor-pointer">
                    <Image src="/user-icon.svg" alt="User" width={24} height={24} />
                    <span className="truncate">
                        {address?.slice(0, 6)}...{address?.slice(-4)}
                    </span>
                    <Image
                        src="/dropdown-arrow.svg"
                        alt="Dropdown"
                        width={16}
                        height={16}
                        onClick={toggleMenu} // 点击显示/隐藏菜单
                        className="cursor-pointer"
                    />

                    {isMenuOpen && (
                        <div className="absolute top-full right-0 mt-2 bg-thirdary text-primary rounded-lg shadow-lg z-10">
                            <ul className="text-sm">
                                <li
                                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={toggleMenu}
                                >
                                    <p className="flex items-center justify-center gap-2">
                                        <Image src="/user-icon.svg" alt="User" width={24} height={24} />
                                        <span className="truncate">
                                            {address?.slice(0, 6)}...{address?.slice(-4)}
                                        </span>
                                    </p>
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={handleDisconnect}
                                >
                                    退出
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <ConnectButton.Custom>
                    {({
                        openConnectModal,

                    }) => (
                        <div
                            onClick={openConnectModal}
                            className="bg-white text-black px-4 py-2 rounded-full mr-[20px]"
                        >
                            Connect Wallet
                        </div>
                    )}
                </ConnectButton.Custom>
            )}
        </div>
    );
};

export default WalletButton;