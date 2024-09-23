"use client";

import React, { FC, useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

interface SwitchTabProps {
  type?: "home" | "normal";
}

const SwitchTab: FC<SwitchTabProps> = ({ type = "normal" }) => {
  const { t } = useTranslation("common");
  const [isBrowser, setIsBrowser] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(
    () => (isBrowser && localStorage.getItem("currentMenuTab")) || "market"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 控制菜单的状态
  const menuRef = useRef<HTMLDivElement>(null); // 用于点击外部关闭菜单的引用
  const router = useRouter(); // 用于跳转
  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  // 更新活动 Tab 和导航
  const handleNavigation = useCallback(
    (path: string, tabKey: string) => {
      localStorage.setItem("currentMenuTab", tabKey);
      setActiveTab(tabKey);

      if (tabKey === "pointMarkets") toggleMenu();
      else router.push(path);

      setIsMenuOpen(false);
    },
    [router]
  );

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // 菜单项的配置
  const menuItems = [
    { label: t("market"), path: "/market", icon: "/referral.svg" },
    { label: t("referral"), path: "/referral", icon: "/referral.svg" },
    { label: t("reward-center"), path: "/reward", icon: "/reward.svg" },
    { label: t("my-points"), path: "/points", icon: "/points.svg" },
  ];

  return (
    <nav
      className={`flex rounded-[6px] text-tab text-400 items-center ${
        type === "normal"
          ? "w-[220px] bg-inactiveTab border border-solid border-tabBorder"
          : ""
      }`}
    >
      <div
        onClick={() => handleNavigation("/discover", "market")}
        className={`whitespace-nowrap py-3 w-full rounded-[6px] cursor-pointer text-center ${
          activeTab === "market" ? "bg-activeTab text-primary" : "text-white"
        }`}
      >
        {t("market")}
      </div>

      <div
        onClick={() => {
          handleNavigation("/points", "pointMarkets");
          toggleMenu();
        }}
        className={`whitespace-nowrap w-full py-3 rounded-[6px] cursor-pointer text-center ${
          activeTab === "pointMarkets"
            ? "bg-activeTab text-primary"
            : "text-activeTab"
        }`}
      >
        {t("points")}
      </div>

      {/* 点击图标触发菜单 */}
      {isMenuOpen && (
        <div className="relative ml-[10px] mt-[28px]" ref={menuRef}>
          <div className="absolute top-full right-0 mt-2 bg-thirdary text-primary text-desc rounded-lg shadow-lg z-10 w-[200px]">
            <ul className="text-sm">
              {menuItems?.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer ${
                    index === 0
                      ? "rounded-tl-xl rounded-tr-xl"
                      : index === menuItems.length - 1
                      ? "rounded-bl-xl rounded-br-xl"
                      : ""
                  }`}
                  onClick={() => handleNavigation(item.path, item.label)}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default SwitchTab;
