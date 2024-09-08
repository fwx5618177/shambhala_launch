import React, { FC, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Table from "@/components/Table";
import { dataSource, switchColumns } from "@/configs/portfolio";
import { Column, RowObject } from "@/components/Table/types";
import { useTranslation } from "react-i18next";

interface PortfolioSectionProps {
  type: "defi" | "transactions" | "detail";
}

const TabSwitcher: FC<{
  activeTab: string;
  onTabSwitch: (tab: "defi" | "transactions") => void;
}> = ({ activeTab, onTabSwitch }) => (
  <div className="w-full flex justify-start space-x-[260px] text-[24px] font-600 border-b border-[#EBEBEB]">
    {["defi", "transactions"].map((tab) => (
      <div
        key={tab}
        className={`px-2 py-2 text-center cursor-pointer ${
          activeTab === tab ? "border-b border-primary" : "bg-white"
        }`}
        onClick={() => onTabSwitch(tab as "defi" | "transactions")}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </div>
    ))}
  </div>
);

const PortfolioSection: FC<PortfolioSectionProps> = ({ type }) => {
  const [activeTab, setActiveTab] = useState<
    "defi" | "transactions" | "detail"
  >(type);
  const router = useRouter();
  const { name } = router.query;
  const columns = switchColumns(type);
  const { t } = useTranslation("common");

  const handleUpdate = () => {};

  return (
    <section className="bg-bg-primary w-full min-h-screen py-[135px] px-[105px]">
      {(type === "defi" || type === "transactions") && (
        <>
          <h1 className="text-lg font-800 text-primary mb-[85px]">
            {t("my-portfolios")}
          </h1>
          <TabSwitcher activeTab={activeTab} onTabSwitch={setActiveTab} />
        </>
      )}

      {type === "detail" && (
        <>
          <div className="text-lg font-800 text-primary mb-[85px] flex items-center gap-[5px] capitalize">
            <Image
              src={`/${name}.svg`}
              alt={name as string}
              width={50}
              height={50}
            />
            <span className="ml-[10px]">{name}</span>
            <div className="ml-[10px] w-[1px] h-[30px] bg-[#929292]" />
            <div className="ml-[10px] flex items-center space-x-2 text-coinSm text-[#929292]">
              <Image src="/eth.svg" alt="Ethereum" width={16} height={16} />
              <span>{t("ethereum")}</span>
            </div>
          </div>
          <div className="mt-[46px] flex flex-col text-primary">
            <span className="text-[14px] font-400">{t("total-assets")}</span>
            <div className="w-full flex items-center justify-between">
              <span className="text-[24px] font-800">$27.78</span>
              <p className="text-[14px] font-500 text-[#929292] flex items-center">
                {t("data-update")}{" "}
                <span className="text-primary ml-1">1 {t("minute")}</span>
                <Image
                  src="/scroll.svg"
                  width={24}
                  height={24}
                  alt="Scroll"
                  className="cursor-pointer ml-2"
                  onClick={handleUpdate}
                />
              </p>
            </div>
          </div>
          <div className="my-[52px]">{t("vaults")}</div>
        </>
      )}

      <div className="my-[50px]">
        <Table
          columns={columns as Column<RowObject>[]}
          dataSource={dataSource}
          type={activeTab === "transactions" ? "card" : "normal"}
        />
      </div>
    </section>
  );
};

export default PortfolioSection;
