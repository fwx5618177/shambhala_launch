import Image from "next/image";
import React, { FC } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
interface EarnProps {
  col?: boolean;
}

const Earn: FC<EarnProps> = ({ col }) => {
  const { t } = useTranslation("common");

  return (
    <section
      className={`h-[638px] bg-bg-primary text-primary flex items-center`}
    >
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between ${
          col ? "flex-col-reverse items-center text-center" : "flex-row"
        }`}
      >
        <div className={`w-1/2 ${col ? "mr-0 mt-6" : "mr-[72px]"}`}>
          <h2 className="text-xl font-bold mb-4">{t("earn")}</h2>
          <p className="text-desc mt-[21px]">{t("home-instrc")}</p>
          <Link href="/discover">
            <div className="w-[200px] h-[42px] bg-primary text-thirdary rounded-full mt-[52px] flex items-center justify-center button-hover mx-auto active:bg-[#484646] hover:bg-[#484646]">
              Earn Now
            </div>
          </Link>
        </div>
        <div className="w-1/2">
          <Image
            src="/earn.png"
            alt="Earn"
            width={670}
            height={365}
            className="rounded-[20px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Earn;
