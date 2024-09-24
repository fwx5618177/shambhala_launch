import MarketCard from "@/components/MarketCard";
import { useTranslation } from "react-i18next";

const MarketSection = () => {
  const { t } = useTranslation("common");

  const hardcodedProductList = [
    {
      abbrId: "1",
      abbrLogo: "USDT",
      abbrSubLogo: "/aave.png",
      abbrTitle: "USDT",
      abbrApy: "3285000",
      abbrCycle: 3,
      maturity: "2023-12-31",
      tvl: "7.67M",
      network: "bsc",
      pid: 123,
      contractAddress:
        "0x6e7E9700350467bc645fb2985D6b63972Eb9F9e1" as `0x${string}`,
      fixedDuration: 0,
      startBlock: 1000000,
      depositLimit: "100,000",
      abbrVersion: "SHAMBHALA",
    },
  ];

  return (
    <section className="bg-bg-primary py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-number text-center text-primary font-600 mb-[75px]">
          {t("discover-yield-markets")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {hardcodedProductList.map((item, index) => (
            <MarketCard
              abbrId={item.abbrId}
              key={index + "market_card"}
              logo={item.abbrLogo}
              subLogo={item.abbrSubLogo}
              coinName={item.abbrTitle}
              apy={item.abbrApy}
              cycle={Number(item.abbrCycle)}
              maturity={item.maturity}
              tvl={item.tvl}
              network={item.network}
              pid={item.pid}
              contractAddress={item.contractAddress}
              fixedDuration={item.fixedDuration}
              startBlock={item.startBlock}
              depositLimit={item.depositLimit}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketSection;
