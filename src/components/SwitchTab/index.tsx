import React, { useState } from "react";

const SwitchTab = () => {
  const [activeTab, setActiveTab] = useState("market");

  return (
    <nav className="w-[220px] flex bg-inactiveTab rounded-[6px] text-tab text-400 border border-solid border-inactiveTab flex items-center">
      <div
        onClick={() => setActiveTab("market")}
        className={`py-3 px-4 rounded-[6px] cursor-pointer ${
          activeTab === "market" ? "bg-activeTab text-primary" : "text-white"
        }`}
      >
        Market
      </div>

      <div
        onClick={() => setActiveTab("pointMarkets")}
        className={`w-full py-3 px-4 rounded-[6px] cursor-pointer text-center ${
          activeTab === "pointMarkets"
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
