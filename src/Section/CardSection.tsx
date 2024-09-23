import React from "react";
import Card from "@/components/Card";
import useStore from "@/store/useStore";

const CardSection = () => {
  const { productList } = useStore();
  const products = productList.slice(0, 3);

  return (
    <section className="py-12 px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {products?.map((item, index) => (
          <Card
            abbrId={item.id}
            key={index + "_card"}
            abbrLogo={item.abbrLogo}
            abbrSubLogo={item.abbrSubLogo}
            abbrTitle={item.abbrTitle}
            abbrApy={item.abbrApy}
            abbrCycle={item.abbrCycle}
            abbrVersion={item.abbrVersion}
            abbrExpireTime={item.abbrExpireTime}
            pid={item.pid}
            contractAddress={item.contractAddress}
            fixedDuration={item.fixedDuration}
            depositLimit={item.depositLimit}
          />
        ))}
      </div>
    </section>
  );
};

export default CardSection;
