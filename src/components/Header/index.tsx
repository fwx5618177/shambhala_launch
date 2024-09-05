'use client';

import React, { FC } from "react";
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
      <div className="flex items-center my-[9px]">
        <WalletButton />
        <Image src={"/union.svg"} width={22} height={22} alt="union" />
      </div>
    </header>
  );
};
