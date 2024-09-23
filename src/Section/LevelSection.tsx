"use client";

import { useEffect, useMemo } from "react";
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

  // 生成邀请链接
  const shareUrl = useMemo(() => `${inviteUrl}?inviteCode=${integralInfo?.inviteCode}`, [integralInfo.inviteCode]);


  return (
    <section className="bg-bg-primary w-full min-h-screen py-[135px]">
      <h1 className="text-[34px] font-800 text-primary mb-[85px] ml-[105px]">
        {t("Referral")}
      </h1>

      <div className="w-full h-[300px] px-[105px] bg-primary flex justify-between items-center text-[24px] font-600 text-thirdary mb-[80px]">
        <div className="text-[32px] font-600">
          <h1 className="text-[40px] font-600">{t("refer-friend")}</h1>
          <span className="text-[28px] font-400">{t("earn-points")}</span>
        </div>
        <div className="w-[600px]">
          <Referral link={shareUrl} />
        </div>
      </div>

      <h1 className="mt-[20px] font-600 text-[32px] ml-[105px]">
        {t("level-reward")}
      </h1>

      <div className="flex items-start justify-between mx-[105px] mt-[20px]">
        <div className="flex items-start space-x-6">
          {[
            { label: t("point-reward"), value: pointReward },
            { label: t("direct-referrals"), value: directReferrals },
          ].map((item, index) => (
            <div
              key={index}
              className="w-[260px] flex flex-col px-[30px] py-[9px] text-primary rounded-card shadow-tableCard"
            >
              <span className="text-primary text-[16px] font-400">
                {item.label}
              </span>
              <span className="text-primary text-[28px] font-600">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="w-[600px]">
          <Limit
            progress={(pointReward / 100) * 100} // Adjust the progress calculation if needed
            current={pointReward.toString()}
            total={"100"}
            footer={false}
            title="Level"
          />
        </div>
      </div>

      <div className="mt-[50px] ml-[105px]">
        <Table columns={levelColumns as any} dataSource={levelDataSource as any} />
      </div>
    </section>
  );
};

export default LevelSection;