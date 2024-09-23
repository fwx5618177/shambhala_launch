import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import Table from "@/components/Table";
import { Column, RowObject } from "@/components/Table/types";
import Image from "next/image";
import Referral from "@/components/Referral";
import { useTranslation } from "react-i18next";
import Router from "next/router";
import useStore from "@/store/useStore";
import { inviteUrl } from "@/utils/url";
import { marketColumns } from "@/configs/marketColumns";
import { pointsRecordColumns } from "@/configs/pointsRecordColumns";
import { referralDetailColumns } from "@/configs/referralDetailColumns";
import { rewardCenterColumns } from "@/configs/rewardCenterColumns";
import { rewardCenterDataSource } from "@/mocks/market";
import { useGetPointLogsByUserId } from "@/services/useGetPointLogsByUserId";

export type PointsMarketSectionProps = {
  type: "pointsMarket" | "referral" | "myRewards" | "rewardCenter";
};

const tabList = ["pointsRecord", "referralDetail"];

const PointsMarketSection: FC<PointsMarketSectionProps> = ({ type }) => {
  const { t } = useTranslation("common");
  const { integralInfo } = useStore();

  const [activeTab, setActiveTab] = useState<"pointsRecord" | "referralDetail">(
    "pointsRecord"
  );

  const userId = integralInfo?.id;

  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    setShareUrl(`${inviteUrl}?inviteCode=${integralInfo?.inviteCode}`);
  }, [integralInfo.inviteCode]);

  const { data: pointsData, refetch } = useGetPointLogsByUserId({
    userId,
    type,
  });

  const dataSource = useMemo(() => {
    switch (type) {
      case "pointsMarket":
        return pointsData?.pointLogs;
      case "myRewards":
        return activeTab === "pointsRecord" ? pointsData?.pointLogs : [];
      case "referral":
        return pointsData?.pointLogs;
      case "rewardCenter":
        return rewardCenterDataSource;
      default:
        return [];
    }
  }, [type, pointsData?.pointLogs, activeTab]);

  const title = useMemo(() => {
    const titles: Record<PointsMarketSectionProps["type"], string> = {
      pointsMarket: t("point-market"),
      referral: t("referral"),
      myRewards: t("my-rewards"),
      rewardCenter: t("reward-center"),
    };
    return titles[type];
  }, [type, t]);

  const handleTabChange = useCallback((tab: "pointsRecord" | "referralDetail") => {
    setActiveTab(tab);
    refetch()
  }, [refetch]);


  const goPage = (to: string) => {
    Router.push(to);
  };


  return (
    <section className="bg-bg-primary w-full min-h-screen py-[60px] sm:py-[80px] md:py-[100px] px-4 sm:px-6 md:px-8 lg:px-[105px]">
      <h1 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[34px] text-primary mb-[40px] sm:mb-[60px] lg:mb-[85px]" style={{
        fontWeight: 800
      }}>{title}</h1>
      {/* Hot Activity */}
      {type === "pointsMarket" && (
        <>
          <h2 className="ml-[10px] text-primary text-[18px] sm:text-[20px] lg:text-[24px] font-600 mb-[30px] sm:mb-[40px] lg:mb-[53px]">
            {t("hot-activity")}
          </h2>
          <div className="w-full px-[20px] flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-[20px] lg:space-x-[39px] text-[20px] sm:text-[24px] font-600 text-thirdary mb-[40px] sm:mb-[60px] lg:mb-[80px]">
            <div
              className="bg-primary w-full sm:w-[280px] md:w-[400px] lg:w-[560px] h-[160px] md:h-[210px] rounded-[10px] flex items-center justify-center cursor-pointer"
              onClick={() => goPage("/referral")}
            >
              <h1 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-600">{t("events-1")}</h1>
            </div>
            <div
              className="bg-primary w-full sm:w-[280px] md:w-[400px] lg:w-[560px] h-[160px] md:h-[210px] rounded-[10px] flex items-center justify-center cursor-pointer"
              onClick={() => goPage("/referral")}
            >
              <h1 className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-600">{t("events-2")}</h1>
            </div>
          </div>
        </>
      )}
      {/* My Rewards */}
      {type === "referral" && (
        <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] px-4 sm:px-6 md:px-8 rounded-[10px] bg-primary flex justify-start items-center space-x-[10px] sm:space-x-[20px] md:space-x-[30px] lg:space-x-[39px] text-[18px] sm:text-[20px] md:text-[24px] font-600 text-thirdary mb-[40px] sm:mb-[60px] lg:mb-[80px]">
          <h1 className="ml-[10px] sm:ml-[20px] md:ml-[40px] lg:ml-[56px] text-[22px] sm:text-[28px] md:text-[32px] font-600">
            {t("referral-title")}
          </h1>
        </div>
      )}

      {(type === "myRewards" || type === "rewardCenter") && (
        <>
          <h1 className="text-primary text-[18px] sm:text-[20px] md:text-[24px] font-400">
            {t("my-points")}
          </h1>
          <div className="flex items-center justify-start gap-[3px] sm:gap-[5px]">
            <span className="text-primary font-600 text-[30px] sm:text-[40px] md:text-[50px] lg:text-[60px]">
              {integralInfo?.points || 0}
            </span>
            <Image src="/points.svg" width={15} height={15} alt="points" className="w-[15px] sm:w-[20px] md:w-[25px]" />
          </div>
        </>
      )}

      {type === "pointsMarket" && (
        <div className="ml-[5px] sm:ml-[10px] my-[20px] sm:my-[40px] md:my-[50px]">
          <h1 className="mb-[20px] sm:mb-[40px] md:mb-[60px] text-primary text-[20px] sm:text-[24px] font-600">
            {t("my-rewards")}
          </h1>
          <Table
            columns={marketColumns as any}
            dataSource={dataSource as any}
            type={"card"}
          />
        </div>
      )}

      {type === "referral" && (
        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-4 sm:gap-[20px] lg:gap-[78px] mb-6 lg:mb-[60px] text-primary text-[16px] sm:text-[20px] lg:text-[24px] font-600">
          <div className="flex flex-col w-full lg:w-1/2">
            <h2 className="mb-4 sm:mb-6 lg:mb-[30px]">{t("reward-detail")}</h2>
            <div className="flex flex-col gap-2 sm:gap-4 lg:gap-[15px]">
              <div
                className="px-4 sm:px-6 lg:px-[50px] py-2 sm:py-3 lg:py-[10px] text-primary rounded-card shadow-tableCard flex items-center justify-between button-hover cursor-pointer"
                onClick={() => goPage("/level")}
              >
                {t("point-reward")}
                <Image
                  src="/right-arrow.svg"
                  width={16}
                  height={16}
                  alt="right arrow"
                  className="w-4 sm:w-5 lg:w-6"
                />
              </div>
              <div
                className="px-4 sm:px-6 lg:px-[50px] py-2 sm:py-3 lg:py-[10px] text-primary rounded-card shadow-tableCard flex items-center justify-between button-hover cursor-pointer"
                onClick={() => goPage("/level")}
              >
                {t("direct-referrals")}
                <Image
                  src="/right-arrow.svg"
                  width={16}
                  height={16}
                  alt="right arrow"
                  className="w-4 sm:w-5 lg:w-6"
                />
              </div>
              <div
                className="px-4 sm:px-6 lg:px-[50px] py-2 sm:py-3 lg:py-[10px] text-primary rounded-card shadow-tableCard flex items-center justify-between button-hover cursor-pointer"
                onClick={() => goPage("/level")}
              >
                {t("related-referrals")}
                <Image
                  src="/right-arrow.svg"
                  width={16}
                  height={16}
                  alt="right arrow"
                  className="w-4 sm:w-5 lg:w-6"
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="mb-4 lg:mb-[30px] flex items-center justify-end gap-2 lg:gap-[5px]">
              {t("referral-rules")}
              <Image
                src={"/right-arrow.svg"}
                width={16}
                height={16}
                alt="arrow"
                className="button-hover w-4 sm:w-5 lg:w-6"
              />
            </div>
            <Referral link={shareUrl} />
          </div>
        </div>
      )}

      {type === "myRewards" && (
        <>
          <div className="mt-4 sm:mt-8 lg:mt-[74px] mb-4 sm:mb-8 lg:mb-[51px] w-full flex justify-start space-x-2 sm:space-x-6 lg:space-x-[100px] text-[16px] sm:text-[20px] lg:text-[24px] font-600 border-b border-[#EBEBEB]">
            {tabList?.map((tab) => (
              <div
                key={tab}
                className={`px-2 sm:px-4 lg:px-6 pt-2 pb-2 sm:pb-4 lg:pb-[32px] text-center cursor-pointer capitalize ${activeTab === tab
                  ? "border-b-[2px] sm:border-b-[3px] border-primary"
                  : "bg-white"
                  }`}
                onClick={() => handleTabChange(tab as "pointsRecord" | "referralDetail")}
              >
                {tab === "pointsRecord"
                  ? t("points-record")
                  : t("referral-detail")}
              </div>
            ))}
          </div>

          <div className="mt-4 sm:mt-6 lg:mt-[41px]">
            {activeTab === "pointsRecord" ? (
              <Table
                columns={pointsRecordColumns as Column<RowObject>[]}
                dataSource={dataSource as any}
                type={"card"}
              />
            ) : (
              <Table
                columns={referralDetailColumns as Column<RowObject>[]}
                dataSource={dataSource as any}
                type={"card"}
              />
            )}
          </div>
        </>
      )}

      {type === "rewardCenter" && (
        <>
          <div className="mt-4 sm:mt-8 lg:mt-[74px] w-full flex justify-start space-x-4 sm:space-x-10 lg:space-x-[260px] text-[16px] sm:text-[20px] lg:text-[24px] font-600">
            {t("reward")}
          </div>
          <div className="mt-4 sm:mt-6 lg:mt-[46px]">
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