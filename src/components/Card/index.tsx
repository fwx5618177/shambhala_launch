import Image from "next/image";
import React, { FC } from "react";
import Link from "next/link";
import { matchImg } from "@/utils/matchImg";

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
  contractAddress: string;
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
  const formattedApy = (Number(abbrApy) / 1000000) * 100;

  return (
    <div className="bg-white text-black p-4 rounded-lg shadow-lg border border-gray-300 w-400">
      <div className="flex items-center justify-between mb-4">
        {/* 左侧部分：Logo 和标题 */}
        <div className="flex items-center space-x-2">
          <div className="relative mr-2">
            <Image
              src={matchImg(abbrLogo)}
              alt={abbrTitle}
              width={40}
              height={40}
              className="rounded-coin"
            />
            <Image
              src={matchImg(abbrSubLogo)}
              alt={abbrTitle}
              width={20}
              height={20}
              className="absolute bottom-0 right-normal"
            />
          </div>
          <div className="ml-[8px]">
            <h3 className="text-coinLg font-500 text-coin">{abbrTitle}</h3>
            <p className="text-coinSm text-secondary">{abbrVersion}</p>
          </div>
        </div>

        <div className="text-right flex flex-row items-center">
          <span className="text-coinXl font-600">{formattedApy}</span>
          <div className="flex flex-col items-center justify-start ml-[2px]">
            <span className="text-coinSm text-primary">%</span>
            <p className="text-coinSm text-primary">APY</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
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
        >
          <div className="w-200 h-41 mt-2 bg-button text-primary text-center px-6 py-2 rounded-button shadow-sm cursor-pointer button-hover">
            Invest
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
