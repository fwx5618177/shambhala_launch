import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

export const Footer = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <footer className="bg-primary text-thirdary w-full py-4 px-6 sm:px-12 flex flex-col sm:flex-row items-start justify-between">
      <div className="mb-4 sm:mb-0 text-left">
        <p className="text-base sm:text-coinMd font-600 mb-2 sm:mb-[14px]">{t("Docs")}</p>
        <p className="text-xs sm:text-desc text-[#999999] cursor-pointer" onClick={() => router.push('/terms')}>{t("Terms-Conditions")}</p>
        <p className="text-xs sm:text-desc text-[#999999] cursor-pointer" onClick={() => router.push('/privacy')}>{t("privacy-title")}</p>
      </div>
      <div className="flex flex-col items-start">
        <p className="text-base sm:text-coinMd font-600 mb-2 sm:mb-[14px]">{t("community")}</p>
        <div className="flex flex-wrap justify-start gap-2 sm:gap-4">
          <Link href="https://x.com/ShambhalaJP?t=dw2EdYr8sUyiHygB0zY-dw&s=09" passHref>
            <Image src={"/x.svg"} alt="Twitter" width={30} height={30} className="sm:w-[45px] sm:h-[45px]" />
          </Link>
          {/* <Link href="https://line.me" passHref>
            <Image src={"/line.svg"} alt="Line" width={30} height={30} className="sm:w-[45px] sm:h-[45px]" />
          </Link> */}
          <Link href="https://t.me/ShambhalaDeFiint" passHref>
            <Image src={"/telegram.svg"} alt="Telegram" width={30} height={30} className="sm:w-[45px] sm:h-[45px]" />
          </Link>
          <Link href="https://www.instagram.com/shambhaladefi?igsh=MThpdGdmYzZuOXgxYQ==" passHref>
            <Image src={"/instagram.svg"} alt="Instagram" width={30} height={30} className="sm:w-[45px] sm:h-[45px]" />
          </Link>
          {/* <Link href="https://discord.com" passHref>
            <Image src={"/discord.svg"} alt="Discord" width={30} height={30} className="sm:w-[45px] sm:h-[45px]" />
          </Link> */}
        </div>
      </div>
    </footer>
  );
};