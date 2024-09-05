import React, { FC, useState } from "react";

interface SwitchTabProps {
  type?: 'home' | 'normal'
}

const SwitchTab: FC<SwitchTabProps> = ({ type = 'normal' }) => {
  const [activeTab, setActiveTab] = useState("market");

  return (
    <nav className={`flex rounded-[6px] text-tab text-400 flex items-center ${type === 'normal' ? "w-[220px] bg-inactiveTab border border-solid border-tabBorder" : ""}`}>
      <div
        onClick={() => setActiveTab("market")}
        className={`py-3 px-4 rounded-[6px] cursor-pointer ${activeTab === "market" ? "bg-activeTab text-primary" : "text-white"
          }`}
      >
        Market
      </div>

      <div
        onClick={() => setActiveTab("pointMarkets")}
        className={`w-full py-3 px-4 rounded-[6px] cursor-pointer text-center ${activeTab === "pointMarkets"
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
