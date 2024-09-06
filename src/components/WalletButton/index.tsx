import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaCopy } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";

const WalletButton: React.FC = () => {
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // 点击外部关闭菜单
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        // 监听点击事件
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    const handleDisconnect = () => {
        disconnect(); // 断开连接
        setIsMenuOpen(false); // 关闭菜单
    };

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev); // 切换菜单显示状态
    };

    // 复制地址后的操作
    const handleCopy = () => {
        toggleMenu()
        setIsCopied(true); // 设置已复制状态
        setTimeout(() => setIsCopied(false), 2000); // 2秒后重置已复制状态
    };

    return (
        <div className="relative flex items-center space-x-2">
            {isConnected ? (
                <div
                    className="flex items-center space-x-2 bg-bannerBg text-thirdary px-4 py-2 rounded-full mr-[20px] cursor-pointer"
                    ref={menuRef} // 将菜单容器引用赋给 menuRef
                    onClick={toggleMenu} // 点击显示/隐藏菜单
                >
                    <Image src="/user-icon.svg" alt="User" width={24} height={24} />
                    <span className="truncate">
                        {address?.slice(0, 6)}...{address?.slice(-4)}
                    </span>
                    <Image
                        src="/dropdown-arrow.svg"
                        alt="Dropdown"
                        width={16}
                        height={16}
                        className="cursor-pointer"
                    />

                    {isMenuOpen && (
                        <div className="absolute top-full right-0 mt-2 bg-thirdary text-primary rounded-lg shadow-lg z-10">
                            <ul className="text-sm">
                                <CopyToClipboard text={address || ''} onCopy={handleCopy}>
                                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                        <p className="flex items-center justify-center gap-2">
                                            <Image src="/user-icon.svg" alt="User" width={24} height={24} />
                                            <span className="truncate">
                                                {address?.slice(0, 6)}...{address?.slice(-4)}
                                            </span>
                                            {/* 修改图标颜色和背景 */}
                                            <FaCopy
                                                size={18}
                                                className="text-black bg-white p-1 rounded-full"
                                            />
                                        </p>
                                    </li>
                                </CopyToClipboard>
                                {isCopied && (
                                    <li className="text-center text-green-500">地址已复制</li>
                                )}
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
                    {({ openConnectModal }) => (
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