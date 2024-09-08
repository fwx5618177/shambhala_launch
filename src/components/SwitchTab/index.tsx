import React, { FC, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router"; // 用于页面跳转

interface SwitchTabProps {
  type?: "home" | "normal";
}

const SwitchTab: FC<SwitchTabProps> = ({ type = "normal" }) => {
  const [activeTab, setActiveTab] = useState("market");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 控制菜单的状态
  const menuRef = useRef<HTMLDivElement>(null); // 用于点击外部关闭菜单的引用
  const router = useRouter(); // 用于跳转

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

  return (
    <nav
      className={`flex rounded-[6px] text-tab text-400 flex items-center ${
        type === "normal"
          ? "w-[220px] bg-inactiveTab border border-solid border-tabBorder"
          : ""
      }`}
    >
      <div
        onClick={() => setActiveTab("market")}
        className={`py-3 px-4 rounded-[6px] cursor-pointer ${
          activeTab === "market" ? "bg-activeTab text-primary" : "text-white"
        }`}
      >
        Market
      </div>

      <div
        onClick={() => {
          setActiveTab("pointMarkets");
          toggleMenu();
        }}
        className={`w-full py-3 px-4 rounded-[6px] cursor-pointer text-center ${
          activeTab === "pointMarkets"
            ? "bg-activeTab text-primary"
            : "text-activeTab"
        }`}
      >
        Point Markets
      </div>

      {/* 点击图标触发菜单 */}
      {isMenuOpen && (
        <div className="relative ml-[10px] mt-[28px]" ref={menuRef}>
          <div className="absolute top-full right-0 mt-2 bg-thirdary text-primary text-desc rounded-lg shadow-lg z-10 w-[200px]">
            <ul className="text-sm">
              <li
                className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  router.push("/referral");
                  setIsMenuOpen(false);
                }}
              >
                <Image
                  src="/referral.svg"
                  alt="Referral"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                Referral
              </li>
              <li
                className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  router.push("/reward");
                  setIsMenuOpen(false);
                }}
              >
                <Image
                  src="/reward.svg"
                  alt="Reward Center"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                Reward Center
              </li>
              <li
                className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  router.push("/points");
                  setIsMenuOpen(false);
                }}
              >
                <Image
                  src="/points.svg"
                  alt="My Points"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                My Points
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default SwitchTab;
