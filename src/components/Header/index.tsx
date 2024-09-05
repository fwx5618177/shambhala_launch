'use client';

import React, { FC, useState } from "react";
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


  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // 切换菜单显示状态
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
      <div className="relative flex items-center my-[9px]">
        <WalletButton />
        <Image src={"/union.svg"} width={22} height={22} alt="union" onClick={toggleMenu} />

        {isMenuOpen && (
          <div className="absolute top-full right-0 mt-2 bg-thirdary text-primary rounded-lg shadow-lg z-10">
            <ul className="text-sm">
              <li
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={toggleMenu}
              >
                English
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={toggleMenu}
              >
                日语
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
