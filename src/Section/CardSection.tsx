import React from "react";
import Card from "@/components/Card";
import useStore from "@/store/useStore";
import { mockProductList } from "@/mocks/mockProductList";

const CardSection = () => {
  const { productList } = useStore();
  const products = productList?.length
    ? productList.slice(0, 3)
    : mockProductList;

  return (
    <section className="py-6 px-4 sm:py-12 sm:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {products?.map((item, index) => (
          <Card
            abbrId={item?.abbrId}
            key={index + "_card"}
            abbrLogo={item.abbrLogo}
            abbrSubLogo={item.abbrSubLogo}
            abbrTitle={item.abbrTitle}
            abbrApy={item.abbrApy}
            abbrCycle={item.abbrCycle}
            abbrVersion={item.abbrVersion}
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
