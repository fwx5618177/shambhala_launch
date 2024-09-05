import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <section className="bg-bannerBg text-white w-full h-[450px] flex items-end">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <h2 className="text-xl font-600 mb-4">
            A powerful Web3 yield aggregator
          </h2>
          <p className="text-desc text-secondary">
            Maximize earnings with top-performing DeFi products curated from
            multiple blockchain protocols
          </p>
        </div>
        <div className="relative w-[600px] h-[420px]">
          <Image src="/role.png" alt="Role" fill />
        </div>
      </div>
    </section>
  );
};

export default Banner;
