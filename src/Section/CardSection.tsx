import React from "react";
import Card from "@/components/Card";

const CardSection = () => {
  return (
    <section className="py-12 px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          logo="/tether.png"
          subLogo="/aave.png"
          title="USDT"
          apy="17.51"
          version="Aave V3"
        />
        <Card
          logo="/solana.png"
          subLogo="/aave.png"
          title="SOL"
          apy="21.58"
          version="Aave V3"
        />
        <Card
          logo="/avax.png"
          subLogo="/aave.png"
          title="AVAX"
          apy="23.57"
          version="Aave V3"
        />
      </div>
    </section>
  );
};

export default CardSection;
