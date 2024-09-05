import React from "react";
import Image from "next/image";
import SwitchTab from "@/components/SwitchTab";

const HomeSwitchSection = () => {
  return (
    <section className="bg-bannerBg text-white w-full h-[232px] flex flex-col items-center text-white">
      <Image src="/skull.svg" alt="Role" width={131} height={83} />
      <span className="text-coinMd font-500 mt-5 mb-10">WEBSITE NAME</span>
      <SwitchTab type='home' />
    </section>
  );
};

export default HomeSwitchSection;
