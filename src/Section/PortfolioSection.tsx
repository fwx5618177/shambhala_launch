import React, { FC, useState } from "react";
import Image from "next/image";

import Table from "@/components/Table";
import { useRouter } from "next/router";
import { dataSource, switchColumns } from "@/configs/portfolio";

interface PortfolioSectionProps {
  type: "defi" | "transactions" | "detail";
}

const PortfolioSection: FC<PortfolioSectionProps> = ({ type }) => {
  const [activeTab, setActiveTab] = useState<
    "defi" | "transactions" | "detail"
  >("defi");
  const router = useRouter();
  const { name } = router.query;
  const columns = switchColumns(type);

  const handleTabSwitch = (tab: "defi" | "transactions") => {
    setActiveTab(tab);
  };

  const handleUpdate = () => {};

  return (
    <section className="bg-bg-primary w-full h-screen py-[135px] px-[105px]">
      {(type === "defi" || type === "transactions") && (
        <>
          <h1 className="text-lg font-800 text-primary mb-[85px]">
            My portfolio
          </h1>
          <div className="w-full flex justify-start space-x-[260px] text-[24px] font-600 border-b border-[#EBEBEB]">
            <div
              className={`px-2 py-2 text-center cursor-pointer ${
                activeTab === "defi" ? "border-b border-primary" : "bg-white"
              }`}
              onClick={() => handleTabSwitch("defi")}
            >
              Defi
            </div>
            <div
              className={`px-4 py-2 text-center cursor-pointer ${
                activeTab === "transactions"
                  ? "border-b border-primary"
                  : "bg-white"
              }`}
              onClick={() => handleTabSwitch("transactions")}
            >
              Transactions
            </div>
          </div>
        </>
      )}

      {type === "detail" && (
        <>
          <div className="text-lg font-800 text-primary mb-[85px] flex items-center justify-start gap-[5px] capitalize">
            <Image src={`/${name}.svg`} alt="Fluid" width={50} height={50} />
            <span className="ml-[10px]">{name}</span>
            <div className="ml-[10px] w-[1px] h-[30px] bg-[#929292]"></div>
            <div className="ml-[10px] flex items-center space-x-2 text-coinSm text-[#929292]">
              <Image src={"/eth.svg"} alt="Ethereum" width={16} height={16} />
              <span>Ethereum</span>
            </div>
          </div>
          <div className="mt-[46px] flex flex-col items-start text-primary">
            <span className="text-[14px] font-400">Total Assets</span>
            <div className="w-full flex items-center justify-between">
              <span className="text-[24px] font-800">$27.78</span>
              <p className="text-[14px] font-500 text-[#929292] flex items-center justify-center">
                Data updated <span className="text-primary">1 minute</span> ago{" "}
                <Image
                  src={"/scroll.svg"}
                  width={24}
                  height={24}
                  alt="Scroll"
                  className="cursor-pointer"
                  onClick={handleUpdate}
                />
              </p>
            </div>
          </div>
          <div className="my-[52px]">Vaults</div>
        </>
      )}

      <div className="my-[50px]">
        <Table
          columns={columns as any}
          dataSource={dataSource}
          type={activeTab === "transactions" ? "card" : "normal"}
        />
      </div>
    </section>
  );
};

export default PortfolioSection;
