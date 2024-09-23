import React, { FC, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Table from "@/components/Table";
import { dataSource } from "@/mocks/portfolio";
import { Column, RowObject } from "@/components/Table/types";
import { useTranslation } from "react-i18next";
import { switchColumns } from "@/configs/portfolioColumns";

interface PortfolioSectionProps {
  type: "defi" | "transactions" | "detail";
}

const TabSwitcher: FC<{
  activeTab: string;
  onTabSwitch: (tab: "defi" | "transactions") => void;
}> = ({ activeTab, onTabSwitch }) => (
  <div className="w-full flex justify-start space-x-4 sm:space-x-10 lg:space-x-[260px] text-sm sm:text-lg lg:text-[24px] font-600 border-b border-[#EBEBEB]">
    {["defi", "transactions"].map((tab) => (
      <div
        key={tab}
        className={`px-2 py-1 sm:py-2 text-center cursor-pointer ${activeTab === tab ? "border-b border-primary" : "bg-white"
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

  const handleUpdate = () => { };

  return (
    <section className="bg-bg-primary w-full min-h-screen py-4 sm:py-8 lg:py-[135px] px-4 sm:px-8 lg:px-[105px]">
      {(type === "defi" || type === "transactions") && (
        <>
          <h1 className="text-base sm:text-lg lg:text-[34px] font-800 text-primary mb-4 sm:mb-8 lg:mb-[85px]">
            {t("my-portfolios")}
          </h1>
          <TabSwitcher activeTab={activeTab} onTabSwitch={setActiveTab} />
        </>
      )}

      {type === "detail" && (
        <>
          <div className="text-sm sm:text-lg lg:text-[34px] font-800 text-primary mb-4 sm:mb-8 lg:mb-[85px] flex items-center gap-2 sm:gap-3 lg:gap-[5px] capitalize">
            <Image
              src={`/${name}.svg`}
              alt={name as string}
              width={30}
              height={30}
              className="sm:w-[40px] sm:h-[40px] lg:w-[50px] lg:h-[50px]"
            />
            <span className="ml-2 sm:ml-4 lg:ml-[10px]">{name}</span>
            <div className="ml-2 sm:ml-4 lg:ml-[10px] w-[1px] h-4 sm:h-6 lg:h-[30px] bg-[#929292]" />
            <div className="ml-2 sm:ml-4 lg:ml-[10px] flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm lg:text-coinSm text-[#929292]">
              <Image src="/eth.svg" alt="Ethereum" width={16} height={16} />
              <span>{t("ethereum")}</span>
            </div>
          </div>
          <div className="mt-4 sm:mt-8 lg:mt-[46px] flex flex-col text-primary">
            <span className="text-xs sm:text-sm lg:text-[14px] font-400">{t("total-assets")}</span>
            <div className="w-full flex items-center justify-between">
              <span className="text-lg sm:text-xl lg:text-[24px] font-800">$27.78</span>
              <p className="text-xs sm:text-sm lg:text-[14px] font-500 text-[#929292] flex items-center">
                {t("data-update")}{" "}
                <span className="text-primary ml-1">1 {t("minute")}</span>
                <Image
                  src="/scroll.svg"
                  width={16}
                  height={16}
                  alt="Scroll"
                  className="cursor-pointer ml-1 sm:ml-2"
                  onClick={handleUpdate}
                />
              </p>
            </div>
          </div>
          <div className="my-4 sm:my-8 lg:my-[52px]">{t("vaults")}</div>
        </>
      )}

      <div className="hidden sm:flex my-4 sm:my-8 lg:my-[50px]">
        <Table
          columns={columns as Column<RowObject>[]}
          dataSource={dataSource}
          type={activeTab === "transactions" ? "card" : "normal"}
          onDetail={(data) => router.push("/detail", {})}
        />
      </div>

      {type === 'detail' && (
        <div className="flex flex-col gap-2 sm:hidden px-4">
          {dataSource.map((data, index) => (
            <div
              key={index}
              className="w-full max-w-full min-h-[100px] max-h-[60vh] bg-white shadow-[0px_2px_8px_rgba(114,144,153,0.25)] rounded-[20px] p-4 mb-4"
              onClick={() => router.push("/detail", {})}
            >
              {/* Header Section */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="relative w-[40px] h-[40px]">
                    <Image
                      src={data?.protocol.src}
                      alt={data?.protocol.alt}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-full"
                    />
                    <Image
                      src="/eth.svg"
                      alt="Ethereum"
                      width={16}
                      height={16}
                      className="absolute bottom-0 right-0"
                    />
                  </div>
                  <span className="ml-2 text-sm font-600">{data?.protocol?.label}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-[#929292] font-600">Assets</span>
                  <span className="text-xs font-400">{data?.assets}</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-nowrap items-center justify-between gap-2">
                <div className="flex flex-col items-start w-[40%]">
                  <span className="text-[10px] text-[#929292] font-600">Invested products</span>
                  <span className="text-xs font-400">{data?.investedProducts}</span>
                </div>

                <div className="flex flex-col items-start w-[40%]">
                  <span className="text-xs text-[#929292] font-600">TVL</span>
                  <span className="text-xs font-400">{data?.assets}</span>
                </div>

                <button className="py-1 px-4 bg-primary text-white rounded-full text-xs">
                  Redeem
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;