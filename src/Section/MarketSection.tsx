import MarketCard from "@/components/MarketCard";
import useStore from "@/store/useStore";
import { useTranslation } from "react-i18next";

const MarketSection = () => {
  const { t } = useTranslation("common");
  const { productList } = useStore();

  return (
    <section className="bg-bg-primary py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-number text-center text-primary font-600 mb-[75px]">
          {t("discover-yield-markets")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {productList.map((item, index) => (
            <MarketCard
              abbrId={item.id}
              key={index + "market_card"}
              logo={item.abbrLogo}
              subLogo={item.abbrSubLogo}
              coinName={item.abbrTitle}
              apy={item.abbrApy}
              cycle={item.abbrCycle}
              maturity={item?.maturity}
              tvl={item?.tvl}
              network={item.network}
              pid={item.pid}
              contractAddress={item.contractAddress}
              fixedDuration={item.fixedDuration}
              startBlock={item.startBlock}
              depositLimit={item?.depositLimit}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketSection;
