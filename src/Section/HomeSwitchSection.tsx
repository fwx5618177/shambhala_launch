import React from "react";
import Image from "next/image";

const HomeSwitchSection = () => {
  return (
    <section className="bg-bannerBg text-white w-full h-[232px] flex flex-col items-cent text-white">
      <Image src="/skull.png" alt="Role" width={131} height={83} />
      <span className="text-coinMd font-500 mt-5">WEBSITE NAME</span>
    </section>
  );
};

export default HomeSwitchSection;
