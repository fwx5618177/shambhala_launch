import React from "react";
import Card from "@/components/Card";
import useStore from "@/store/useStore";

const CardSection = () => {
  const hardcodedProductList = [
    {
      abbrId: "1",
      abbrLogo: "/path-to-usdt-logo.png",
      abbrSubLogo: "/path-to-bsc-logo.png",
      abbrTitle: "USDT",
      abbrApy: "3285000",
      abbrCycle: 3,
      maturity: "2023-12-31",
      tvl: "7.67M",
      network: "Binance Smart Chain",
      pid: 123,
      contractAddress:
        "0x6e7E9700350467bc645fb2985D6b63972Eb9F9e1" as `0x${string}`,
      fixedDuration: 0,
      startBlock: 1000000,
      depositLimit: "100,000",
      abbrVersion: "",
      abbrExpireTime: "",
    },
  ];

  return (
    <section className="py-6 px-4 sm:py-12 sm:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {hardcodedProductList?.map((item, index) => (
          <Card
            abbrId={item?.abbrId}
            key={index + "_card"}
            abbrLogo={item.abbrLogo}
            abbrSubLogo={item.abbrSubLogo}
            abbrTitle={item.abbrTitle}
            abbrApy={item.abbrApy}
            abbrCycle={item.abbrCycle}
            abbrVersion={item?.abbrVersion}
            abbrExpireTime={String(item?.abbrExpireTime)}
            pid={item.pid}
            contractAddress={item.contractAddress as `0x${string}`}
            fixedDuration={item.fixedDuration}
            depositLimit={item.depositLimit}
          />
        ))}
      </div>
    </section>
  );
};

export default CardSection;
