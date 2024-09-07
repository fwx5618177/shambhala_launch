import React from "react";
import Image from "next/image";
import SwitchTab from "@/components/SwitchTab";
import { useTranslation } from "react-i18next";

const HomeSwitchSection = () => {
  const { t } = useTranslation("common");

  return (
    <section className="bg-bannerBg text-white w-full h-[232px] flex flex-col items-center text-white">
      <Image src="/skull.svg" alt="Role" width={131} height={83} />
      <span className="text-coinMd font-500 mt-5 mb-10">{t("title")}</span>
      <SwitchTab type="home" />
    </section>
  );
};

export default HomeSwitchSection;
