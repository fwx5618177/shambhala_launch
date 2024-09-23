import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <section className="bg-bannerBg text-white w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] flex items-center">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 w-full">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-4">
            A powerful Web3 yield aggregator
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-secondary">
            Maximize earnings with top-performing DeFi products curated from
            multiple blockchain protocols
          </p>
        </div>

        {/* Image Container */}
        <div className="hidden md:flex relative w-[250px] h-[200px] sm:w-[400px] sm:h-[320px] md:w-[500px] md:h-[350px] lg:w-[600px] lg:h-[420px]">
          <Image
            src="/role.png"
            alt="Role"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;