import React, { FC } from "react";
import Logo from "@/components/Logo";
import SwitchTab from "@/components/SwitchTab";
import Image from "next/image";

interface HeaderProps {
  logo?: boolean;
  switchTab?: boolean;
  type?: "fixed" | "normal";
}

export const Header: FC<HeaderProps> = ({ logo, switchTab, type }) => {
  return (
    <header
      style={{
        position: type === "fixed" ? "fixed" : undefined,
      }}
      className="flex justify-between items-center py-4 px-8 bg-bannerBg text-white"
    >
      <div className="flex items-center space-x-4">
        {logo && <Logo size="large" />}
      </div>
      {switchTab && <SwitchTab />}
      <div className="flex items-center my-[9px]">
        <button className="bg-white text-black px-4 py-2 rounded-full mr-[20px]">
          Connect Wallet
        </button>

        <Image src={"/union.svg"} width={22} height={22} alt="union" />
      </div>
    </header>
  );
};
