import React from "react";
import Image from "next/image";

const RegionBanner = () => {
    return (
        <section className="bg-primary text-thirdary w-full h-[250px] flex items-center">
            <div className="ml-[110px]">
                <h2 className="text-xl font-600 mb-4">
                    Banner Region
                </h2>
                <p className="text-md font-400">
                    One-sentence introduction
                </p>
            </div>
        </section>
    );
};

export default RegionBanner;
