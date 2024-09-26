import React from "react";
import Image from "next/image";
import WalletButton from "@/components/WalletButton";
import { useAccount } from "wagmi";
import { useTranslation } from "react-i18next";

const Banner = () => {
  const { isConnected } = useAccount();
  const { t } = useTranslation("common");

  return (
    <section className="bg-bannerBg text-white w-full flex items-center py-[5rem]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between sm:px-8 w-full h-full mt-[60px]">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-4">
            {t("index-title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-secondary">
            {t("index-desc")}
          </p>

          {!isConnected && (
            <div className="sm:hidden w-full flex items-center justify-center mt-[2.5rem]">
              <WalletButton size="large" />
            </div>
          )}
        </div>

        {/* Image Container */}
        <div className="hidden md:flex relative w-[250px] h-[200px] sm:w-[400px] md:w-[500px] md:h-[350px] lg:w-[600px] ">
          <Image
            src="/role.png"
            alt="Role"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
