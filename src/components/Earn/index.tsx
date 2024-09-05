import React from "react";

const Earn = () => {
  return (
    <section className="py-12 px-8 bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="w-1/2">
          <h2 className="text-4xl font-bold mb-4">Earn</h2>
          <p className="text-lg mb-6">
            Earn more when you re-stake with ethfi. Stake your ETH or stETH and
            get ETH+...
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-full">
            Earn Now
          </button>
        </div>
        <div className="w-1/2">
          <img
            src="/earn-screenshot.png"
            alt="Earn Screenshot"
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Earn;
