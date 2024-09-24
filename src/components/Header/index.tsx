"use client";

import React, { FC, useState, useRef, useEffect } from "react";
import Logo from "@/components/Logo";
import SwitchTab from "@/components/SwitchTab";
import Image from "next/image";
import WalletButton from "@/components/WalletButton";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import useStore from "@/store/useStore";
import MobileMenu from "@/components/MobileMenu"; // 引入 MobileMenu 组件
import { languageList } from "@/utils/languageList";
import { useChangeLanguage } from "@/hooks/useChangeLanguage";

interface HeaderProps {
  logo?: boolean;
  switchTab?: boolean;
  type?: "fixed" | "normal";
  tabType?: "home" | "normal";
}

export const Header: FC<HeaderProps> = ({
  logo,
  switchTab,
  type = "normal",
  tabType,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 添加移动端菜单状态
  const [activeTab, setActiveTab] = useState<"language" | "currency">(
    "language"
  );
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("common");
  const { isLogin } = useStore();
  const changeLanguage = useChangeLanguage();

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

  const handleTabSwitch = (tab: "language" | "currency") => {
    setActiveTab(tab);
  };

  // 控制移动端菜单的显示和隐藏
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header
      style={{
        position: type === "fixed" ? "fixed" : undefined,
        width: type === "fixed" ? "100%" : undefined,
        zIndex: type === "fixed" ? 99 : undefined,
        background: type === "fixed" ? "rgba(24, 24, 24, 0.8)" : undefined,
      }}
      className="relative flex justify-between items-center py-2 px-4 sm:px-8 bg-bannerBg text-white"
    >
      <div className="flex items-center space-x-4">
        {logo && (
          <Link href="/">
            <Logo size="large" />
          </Link>
        )}
      </div>

      {/* switchTab 在不同端的显示处理 */}
      {switchTab && (
        <div className="hidden sm:flex">
          <SwitchTab type={tabType} />
        </div>
      )}

      <div className="flex items-center">
        {/* 确保 WalletButton 在所有屏幕上可见 */}
        <WalletButton />

        {/* 手机端菜单按钮 */}
        <div className="sm:hidden">
          <Image
            src="/menu.svg"
            width={24}
            height={24}
            alt="menu"
            onClick={toggleMobileMenu} // 控制 MobileMenu 的显示
            className="cursor-pointer"
          />
        </div>

        {/*/!* 菜单图标仅在中大屏幕显示 *!/*/}
        <div className="hidden sm:flex items-center space-x-4">
          <Image
            src={"/union.svg"}
            width={22}
            height={22}
            alt="union"
            onClick={toggleMenu}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* 下拉菜单 */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute top-1/2 right-4 sm:right-8 mt-2 bg-thirdary text-primary rounded-lg shadow-lg z-10 p-4 w-64 sm:w-auto"
        >
          <div className="flex justify-between border-b border-[#EBEBEB] mb-2">
            <div
              className={`px-2 py-2 text-center cursor-pointer ${
                activeTab === "language"
                  ? "border-b border-primary text-black"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabSwitch("language")}
            >
              {t("language")}
            </div>
            <div
              className={`px-4 py-2 text-center cursor-pointer ${
                activeTab === "currency"
                  ? "border-b border-primary text-black"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabSwitch("currency")}
            >
              {t("currency")}
            </div>
          </div>

          {activeTab === "language" ? (
            <ul className="text-sm space-y-1">
              {languageList?.map((lang) => (
                <li
                  key={lang}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-md"
                  onClick={() => {
                    changeLanguage(lang);
                    toggleMenu();
                  }}
                >
                  {t(`language-${lang}`)}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="text-sm space-y-1">
              {["$ USD", "¥ JPY"].map((currency) => (
                <li
                  key={currency}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-md"
                  onClick={toggleMenu}
                >
                  {currency}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* 添加的 MobileMenu 组件，显示在移动端 */}
      {isMobileMenuOpen && <MobileMenu onClose={toggleMobileMenu} />}
    </header>
  );
};
