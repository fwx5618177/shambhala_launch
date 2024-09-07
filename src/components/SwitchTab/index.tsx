import React, { FC, useState, startTransition, useEffect } from "react";
import Router from "next/router";
interface SwitchTabProps {
  type?: "home" | "normal";
}
const SwitchTab: FC<SwitchTabProps> = ({ type = "normal" }) => {
  const [activeTab, setActiveTab] = useState("");
  function selectTab(nextTab: string) {
    localStorage.setItem("nextTab", nextTab);
    startTransition(() => {
      // 在这里进行状态更新
      if (nextTab == "pointMarkets") {
        Router.push("/market");
      } else {
        Router.push("/discover");
      }
      setActiveTab(nextTab);
    });
  }
  useEffect(() => {
    setActiveTab(localStorage.getItem("nextTab"));
  });
  return (
    <nav
      className={`flex rounded-[6px] text-tab text-400 flex items-center ${
        type === "normal"
          ? "w-[220px] bg-inactiveTab border border-solid border-tabBorder"
          : ""
      }`}
    >
      <div
        onClick={() => selectTab("market")}
        className={`py-3 px-4 rounded-[6px] cursor-pointer ${
          activeTab == "market" ? "bg-activeTab text-primary" : "text-white"
        }`}
      >
        Market
      </div>

      <div
        onClick={() => selectTab("pointMarkets")}
        className={`w-full py-3 px-4 rounded-[6px] cursor-pointer text-center ${
          activeTab == "pointMarkets"
            ? "bg-activeTab text-primary"
            : "text-activeTab"
        }`}
      >
        Point Markets
      </div>
    </nav>
  );
};

export default SwitchTab;
