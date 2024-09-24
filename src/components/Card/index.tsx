import Image from "next/image";
import React, { FC } from "react";
import Link from "next/link";
import { matchImg } from "@/utils/matchImg";
import numeral from "numeral";

export interface CardProps {
  abbrId: string;
  abbrLogo: string;
  abbrSubLogo: string;
  abbrTitle: string;
  abbrApy: string | number;
  abbrCycle: number;
  abbrVersion: string;
  abbrExpireTime: string;
  pid: number;
  contractAddress: `0x${string}`;
  fixedDuration: number;
  depositLimit: string;
}

const Card: FC<CardProps> = ({
  abbrId,
  abbrLogo,
  abbrSubLogo,
  abbrTitle,
  abbrApy,
  abbrCycle,
  abbrVersion,
  abbrExpireTime,
  contractAddress,
  pid,
  fixedDuration,
  depositLimit,
}) => {
  const formattedApy = numeral(abbrApy)
    .divide(1000000)
    .multiply(100)
    .format("0.00");

  return (
    <div className="bg-white text-black p-4 rounded-lg shadow-lg border border-gray-300 w-full sm:w-80 md:w-[350px] lg:w-[400px] transition-all duration-300">
      <div className="flex flex-nowrap sm:flex-row items-center justify-between mb-4">
        {/* 左侧部分：Logo 和标题 */}
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <div className="relative mr-2">
            <Image
              src={matchImg(abbrLogo)}
              alt={abbrTitle}
              width={32}
              height={32}
              className="rounded-coin w-[32px] h-[32px] sm:w-[40px] sm:h-[40px]"
            />
            <Image
              src={matchImg(abbrSubLogo)}
              alt={abbrTitle}
              width={16}
              height={16}
              className="absolute bottom-0 right-normal w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
            />
          </div>
          <div className="ml-[8px]">
            <h3 className="text-sm sm:text-base font-medium text-coin">
              {abbrTitle}
            </h3>
            <p className="text-xs sm:text-sm text-secondary">{abbrVersion}</p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center sm:justify-end">
          <span className="text-lg sm:text-coinXl font-semibold">
            {formattedApy}
          </span>
          <div className="flex flex-col items-center justify-start ml-[2px]">
            <span className="text-xs sm:text-coinSm text-primary">%</span>
            <p className="text-xs sm:text-coinSm text-primary">APY</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-2">
        <Link
          href={{
            pathname: "/asset",
            query: {
              abbrId,
              abbrLogo,
              abbrTitle,
              abbrApy,
              abbrCycle,
              abbrVersion,
              abbrExpireTime,
              contractAddress,
              pid,
              fixedDuration,
              depositLimit,
            },
          }}
          className="w-full flex items-center justify-center"
        >
          <div className="w-full max-w-[200px] h-[36px] sm:h-[41px] bg-button text-primary text-center flex items-center justify-center px-4 sm:px-6 py-2 rounded-md sm:rounded-button shadow-sm cursor-pointer button-hover transition-all duration-300">
            Invest
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
