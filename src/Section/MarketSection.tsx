import MarketCard from "@/components/MarketCard";
import { useTranslation } from "react-i18next";

const MarketSection = () => {
  const { t } = useTranslation("common");

  return (
    <section className="bg-bg-primary py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-number text-center text-primary font-600 mb-[75px]">
          {t("discover-yield-markets")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <MarketCard
            logo="/avax.png"
            subLogo="/aave.png"
            coinName="AVAX"
            apy="23.57"
            tvl="10.5M"
            network="Ethereum"
          />
          <MarketCard
            logo="/solana.png"
            subLogo="/aave.png"
            coinName="SOL"
            apy="23.57"
            tvl="10.5M"
            network="Ethereum"
          />
          <MarketCard
            logo="/tether.png"
            subLogo="/aave.png"
            coinName="USDT"
            apy="23.57"
            tvl="10.5M"
            network="Ethereum"
          />
          <MarketCard
            logo="/usdc.png"
            subLogo="/aave.png"
            coinName="USDC"
            apy="23.57"
            tvl="10.5M"
            network="Ethereum"
          />
        </div>
      </div>
    </section>
  );
};

export default MarketSection;
