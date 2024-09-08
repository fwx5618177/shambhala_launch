import Image from "next/image";
import React, { FC } from "react";
import Link from "next/link";
interface CardProps {
  logo: string;
  subLogo: string;
  title: string;
  apy: string;
  version: string;
}

const Card: FC<CardProps> = ({ logo, subLogo, title, apy, version }) => {
  return (
    <div className="bg-white text-black p-4 rounded-lg shadow-lg border border-gray-300 w-400">
      <div className="flex items-center justify-between mb-4">
        {/* 左侧部分：Logo 和标题 */}
        <div className="flex items-center space-x-2">
          <div className="relative mr-2">
            <Image
              src={logo}
              alt={title}
              width={40}
              height={40}
              className="rounded-coin"
            />
            <Image
              src={subLogo}
              alt={title}
              width={20}
              height={20}
              className="absolute bottom-0 right-normal"
            />
          </div>
          <div className="ml-[8px]">
            <h3 className="text-coinLg font-500 text-coin">{title}</h3>
            <p className="text-coinSm text-secondary">{version}</p>
          </div>
        </div>

        <div className="text-right flex flex-row items-center">
          <span className="text-coinXl font-600">{apy}</span>
          <div className="flex flex-col items-center justify-start ml-[2px]">
            <span className="text-coinSm text-primary">%</span>
            <p className="text-coinSm text-primary">APY</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Link href="/asset">
          <div className="w-200 h-42 mt-2 bg-button text-primary text-center px-6 py-2 rounded-button shadow-sm cursor-pointer button-hover">
            Invest
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
