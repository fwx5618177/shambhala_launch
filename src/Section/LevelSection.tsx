"use client";

import { useEffect, useMemo, useState } from "react";
import Limit from "@/components/Limit";
import Referral from "@/components/Referral";
import Table from "@/components/Table";
import { useTranslation } from "react-i18next";
import useStore from "@/store/useStore";
import { inviteUrl } from "@/utils/url";
import { levelColumns } from "@/configs/levelColumns";
import { levelDataSource } from "@/mocks/level";
import { useGetPointLogsByUserId } from "@/services/useGetPointLogsByUserId";

const LevelSection = () => {
  const { t } = useTranslation("common");
  const { integralInfo } = useStore();
  const userId = integralInfo?.id;

  // 获取用户的积分日志数据
  const { data } = useGetPointLogsByUserId({ userId });

  // 计算总积分和直接推荐数量
  const pointReward = useMemo(() => {
    return data?.pointLogs?.reduce((total, log) => total + log.pointChange, 0) || 0;
  }, [data]);

  const directReferrals = data?.pointLogs?.length || 0;

  const rewardList = [
    { label: t("point-reward"), value: pointReward },
    { label: t("direct-referrals"), value: directReferrals },
  ]

  // 使用 useState 解决 SSR 报错
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    setShareUrl(`${inviteUrl}?inviteCode=${integralInfo?.inviteCode}`);
  }, [integralInfo.inviteCode]);

  return (
    <section className="bg-bg-primary w-full min-h-screen py-[60px] sm:py-[80px] md:py-[100px] lg:py-[135px]">
      <h1 className="text-[24px] sm:text-[28px] md:text-[34px] font-800 text-primary mb-[40px] sm:mb-[60px] md:mb-[85px] ml-4 sm:ml-8 md:ml-16 lg:ml-[105px]">
        {t("Referral")}
      </h1>

      <div className="w-full py-3 h-auto sm:h-[200px] md:h-[250px] lg:h-[300px] px-4 sm:px-8 md:px-16 lg:px-[105px] bg-primary flex flex-col sm:flex-row justify-between items-start sm:items-center text-[18px] sm:text-[24px] font-600 text-thirdary mb-[40px] sm:mb-[60px] md:mb-[80px]">
        <div className="text-[24px] sm:text-[32px] font-600 mb-4 sm:mb-0">
          <h1 className="text-[28px] sm:text-[32px] lg:text-[40px] font-600">{t("refer-friend")}</h1>
          <span className="text-[20px] sm:text-[24px] lg:text-[28px] font-400">{t("earn-points")}</span>
        </div>
        <div className="w-full sm:w-auto lg:w-[600px]">
          <Referral link={shareUrl} />
        </div>
      </div>

      <h1 className="mt-[20px] text-[24px] sm:text-[28px] lg:text-[32px] font-600 ml-4 sm:ml-8 md:ml-16 lg:ml-[105px]">
        {t("level-reward")}
      </h1>

      <div className="flex flex-col sm:flex-row items-start justify-between mx-4 sm:mx-8 md:mx-16 lg:mx-[105px] mt-[20px]">
        <div className="flex flex-wrap w-full items-start gap-4 sm:gap-6 mb-4 sm:mb-0">
          {rewardList?.map((item, index) => (
            <div
              key={index}
              className="flex-1 min-w-[45%] sm:min-w-[48%] md:min-w-[45%] lg:min-w-[48%] max-w-[48%] flex flex-col px-4 sm:px-6 py-2 sm:py-4 text-primary rounded-card shadow-tableCard"
            >
              <span className="text-primary text-sm sm:text-base font-400">{item.label}</span>
              <span className="text-primary text-lg sm:text-xl lg:text-2xl font-600">{item.value}</span>
            </div>
          ))}
        </div>

        <div className="w-full sm:w-[300px] md:w-[450px] lg:w-[600px] mt-4 sm:mt-0">
          <Limit
            progress={(pointReward / 100) * 100}
            current={pointReward.toString()}
            total={"100"}
            footer={false}
            title="Level"
          />
        </div>
      </div>

      <div className="mt-[20px] sm:mt-[30px] md:mt-[50px] ml-4 sm:ml-8 md:ml-16 lg:ml-[105px]">
        <Table columns={levelColumns as any} dataSource={levelDataSource as any} />
      </div>
    </section>
  );
};

export default LevelSection;