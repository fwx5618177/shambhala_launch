'use client';

import React, { FC, useState, useRef, useEffect } from "react";
import Logo from "@/components/Logo";
import SwitchTab from "@/components/SwitchTab";
import Image from "next/image";
import WalletButton from "@/components/WalletButton";

interface HeaderProps {
  logo?: boolean;
  switchTab?: boolean;
  type?: "fixed" | "normal";
  tabType?: 'home' | 'normal'
}

export const Header: FC<HeaderProps> = ({ logo, switchTab, type = 'normal', tabType }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'language' | 'currency'>('language');
  const menuRef = useRef<HTMLDivElement>(null);

  // 点击菜单外关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleTabSwitch = (tab: 'language' | 'currency') => {
    setActiveTab(tab);
  };

  return (
    <header
      style={{
        position: type === "fixed" ? "fixed" : undefined,
        width: type === "fixed" ? "100%" : undefined,
        zIndex: type === "fixed" ? 99 : undefined,
        background: type === "fixed" ? "rgba(24, 24, 24, 0.5)" : undefined,
      }}
      className="flex justify-between items-center py-4 px-8 bg-bannerBg text-white"
    >
      <div className="flex items-center space-x-4">
        {logo && <Logo size="large" />}
      </div>
      {switchTab && <SwitchTab type={tabType} />}
      <div className="relative flex items-center my-[9px]" ref={menuRef}>
        <WalletButton />
        <Image src={"/union.svg"} width={22} height={22} alt="union" onClick={toggleMenu} />

        {isMenuOpen && (
          <div className="p-[20px] absolute top-full right-0 mt-2 bg-thirdary text-primary text-desc rounded-lg shadow-lg z-10">
            <div className="flex justify-between border-b border-[#EBEBEB]">
              <div
                className={`px-2 py-2 text-center cursor-pointer ${activeTab === 'language' ? 'border-b border-primary' : 'bg-white'}`}
                onClick={() => handleTabSwitch('language')}
              >
                Language
              </div>
              <div
                className={`px-4 py-2 text-center cursor-pointer ${activeTab === 'currency' ? 'border-b border-primary' : 'bg-white'}`}
                onClick={() => handleTabSwitch('currency')}
              >
                Currency
              </div>
            </div>

            {activeTab === 'language' ? (
              <ul className="text-sm">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={toggleMenu}>
                  English
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={toggleMenu}>
                  日本語
                </li>
              </ul>
            ) : (
              <ul className="text-sm">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={toggleMenu}>
                  ETH
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={toggleMenu}>
                  USDT
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </header>
  );
};