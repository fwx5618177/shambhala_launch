import React, { FC, useEffect, useState } from "react";
import Table from "@/components/Table";
import { Column, RowObject } from "@/components/Table/types";
import {
  marketColumns,
  marketDataSource,
  pointsRecordColumns,
  pointsRecordDataSource,
  referralDetailColumns,
  referralDetailDataSource,
  rewardCenterColumns,
  rewardCenterDataSource,
} from "@/configs/market";
import Image from "next/image";
import Referral from "@/components/Referral";
import { useTranslation } from "react-i18next";
import Router from "next/router";
import api from "@/http/axios";

type PointsMarketSectionProps = {
  type: "pointsMarket" | "referral" | "myRewards" | "rewardCenter";
};

const PointsMarketSection: FC<PointsMarketSectionProps> = ({ type }) => {
  const [activeTab, setActiveTab] = useState<"pointsRecord" | "referralDetail">(
    "pointsRecord"
  );
  const { t } = useTranslation("common");
  const goPage = (to: string) => {
    Router.push(to);
  };
  const title = () => {
    switch (type) {
      case "pointsMarket":
        return t("point-market");
      case "referral":
        return t("referral");
      case "myRewards":
        return t("my-rewards");
      case "rewardCenter":
      default:
        return t("reward-center");
    }
  };
  const [activeData, setActiveData] = useState([]);
  const getList = async () => {
    const response = await api.get("/api/list");
    console.log("kkkk", response.data);
    setActiveData(response.data);
    console.log("activeCard", activeData);
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <section className="bg-bg-primary w-full min-h-screen py-[135px] px-[105px]">
      <h1 className="text-[34px] font-800 text-primary mb-[85px]">{title()}</h1>
      {/* Hot Activity */}
      {type === "pointsMarket" && (
        <>
          <h2 className="ml-[10px] text-primary text-[24px] font-600 mb-[53px]">
            {t("hot-activity")}
          </h2>
          <div className="w-full px-[20px] flex justify-center space-x-[39px] text-[24px] font-600 text-thirdary mb-[80px]">
            <div
              className="bg-primary w-[560px] h-[210px] rounded-[10px] flex items-center justify-center"
              onClick={() => goPage("/referral")}
            >
              <h1 className="text-[32px] font-600">{t("events-1")}</h1>
            </div>
            <div
              className="bg-primary w-[560px] h-[210px] rounded-[10px] flex items-center justify-center"
              onClick={() => goPage("/referral")}
            >
              <h1 className="text-[32px] font-600">{t("events-2")}</h1>
            </div>
          </div>
        </>
      )}
      {/* My Rewards */}
      {type === "referral" && (
        <div className="w-full h-[300px] px-[20px] rounded-[10px] bg-primary flex justify-start items-center space-x-[39px] text-[24px] font-600 text-thirdary mb-[80px]">
          <h1 className="ml-[56px] text-[32px] font-600">
            {t("referral-title")}
          </h1>
        </div>
      )}

      {(type === "myRewards" || type === "rewardCenter") && (
        <>
          <h1 className="text-primary text-[24px] font-400">
            {t("my-points")}
          </h1>
          <div className="flex items-center justify-start gap-[5px]">
            <span className="text-primary font-600 text-[60px]">50</span>
            <Image src="/points.svg" width={25} height={25} alt="points" />
          </div>
        </>
      )}

      {type === "pointsMarket" && (
        <div className="ml-[10px] my-[50px]">
          <h1 className="mb-[60px] text-primary text-[24px] font-600">
            {t("my-rewards")}
          </h1>
          <Table
            columns={marketColumns as Column<RowObject>[]}
            dataSource={marketDataSource as any}
            type={"card"}
          />
        </div>
      )}

      {type === "referral" && (
        <div className="w-full flex items-start justify-between gap-[78px] mb-[60px] text-primary text-[24px] font-600">
          <div className="flex flex-col w-1/2">
            <h2 className="mb-[30px]">{t("reward-detail")}</h2>
            <div className="flex flex-col gap-[15px]">
              <div
                className="px-[50px] py-[10px] text-primary rounded-card shadow-tableCard flex items-center justify-between button-hover"
                onClick={() => goPage("/level")}
              >
                {t("point-reward")}
                <Image
                  src="/right-arrow.svg"
                  width={20}
                  height={20}
                  alt="right arrow"
                />
              </div>
              <div
                className="px-[50px] py-[10px] text-primary rounded-card shadow-tableCard flex items-center justify-between button-hover"
                onClick={() => goPage("/level")}
              >
                {t("direct-referrals")}
                <Image
                  src="/right-arrow.svg"
                  width={20}
                  height={20}
                  alt="right arrow"
                />
              </div>
              <div
                className="px-[50px] py-[10px] text-primary rounded-card shadow-tableCard flex items-center justify-between button-hover"
                onClick={() => goPage("/level")}
              >
                {t("related-referrals")}
                <Image
                  src="/right-arrow.svg"
                  width={20}
                  height={20}
                  alt="right arrow"
                />
              </div>
            </div>
          </div>

          <div className="w-1/2 flex flex-col">
            <div className="mb-[30px] flex items-center justify-end gap-[5px]">
              {t("referral-rules")}
              <Image
                src={"/right-arrow.svg"}
                width={20}
                height={20}
                alt="arrow"
                className="button-hover"
              />{" "}
            </div>
            <Referral link="xxx.io/referral?ref=CODE" />
          </div>
        </div>
      )}

      {type === "myRewards" && (
        <>
          <div className="mt-[74px] mb-[51px] w-full flex justify-start space-x-[100px] text-[24px] font-600 border-b border-[#EBEBEB]">
            {["pointsRecord", "referralDetail"].map((tab) => (
              <div
                key={tab}
                className={`px-2 pt-2 pb-[32px] text-[24px] font-600 text-primary  text-center cursor-pointer capitalize ${
                  activeTab === tab
                    ? "border-b-[3px] border-primary"
                    : "bg-white"
                }`}
                onClick={() => {
                  setActiveTab(tab as "pointsRecord" | "referralDetail");
                }}
              >
                {tab === "pointsRecord"
                  ? t("points-record")
                  : t("referral-detail")}
              </div>
            ))}
          </div>

          <div className="mt-[41pxs]">
            {activeTab === "pointsRecord" ? (
              <Table
                columns={pointsRecordColumns as Column<RowObject>[]}
                dataSource={pointsRecordDataSource as any}
                type={"card"}
              />
            ) : (
              <Table
                columns={referralDetailColumns as Column<RowObject>[]}
                dataSource={referralDetailDataSource as any}
                type={"card"}
              />
            )}
          </div>
        </>
      )}

      {type === "rewardCenter" && (
        <>
          <div className="mt-[74px] w-full flex justify-start space-x-[260px] text-[24px] font-600">
            {t("reward")}
          </div>
          <div className="mt-[46px]">
            <Table
              header={false}
              columns={rewardCenterColumns as Column<RowObject>[]}
              dataSource={rewardCenterDataSource as any}
              type={"card"}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default PointsMarketSection;
