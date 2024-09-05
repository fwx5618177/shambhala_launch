import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-primary text-thirdary w-full h-[188px] flex items-center justify-around">
      <div>
        <p className="text-coinMd font-600 mb-[14px]">Docs</p>
        <p className="text-desc text-[#999999]">Terms & Conditions</p>
      </div>
      <div className="flex space-x-4 flex-col items-start">
        <p className="text-coinMd font-600 mb-[14px]">Community</p>
        <div className="flex space-x-4">
          <Link href="https://twitter.com" passHref>
            <Image src={'/x.svg'} alt="Twitter" width={45} height={45} />
          </Link>
          <Link href="https://line.me" passHref>
            <Image src={'/line.svg'} alt="Twitter" width={45} height={45} />
          </Link>
          <Link href="https://telegram.org" passHref>
            <Image src={'/telegram.svg'} alt="Twitter" width={45} height={45} />
          </Link>
          <Link href="https://instagram.com" passHref>
            <Image src={'/instagram.svg'} alt="Twitter" width={45} height={45} />
          </Link>
          <Link href="https://discord.com" passHref>
            <Image src={'/discord.svg'} alt="Twitter" width={45} height={45} />
          </Link>
        </div>
      </div>
    </footer>
  );
};