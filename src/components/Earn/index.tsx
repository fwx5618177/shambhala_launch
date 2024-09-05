import Image from "next/image";
import React, { FC } from "react";

interface EarnProps {
  col?: boolean;
}

const Earn: FC<EarnProps> = ({ col }) => {
  return (
    <section className={`h-[638px] bg-bg-primary text-primary flex items-center`}>
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between ${col ? 'flex-col-reverse items-center text-center' : 'flex-row'
          }`}
      >
        <div className={`w-1/2 ${col ? 'mr-0 mt-6' : 'mr-[72px]'}`}>
          <h2 className="text-xl font-bold mb-4">Earn</h2>
          <p className="text-desc mt-[21px]">
            Earn more when you re-stake with ether.fi Stake your ETH or stETH and get eETH - a
            natively re-staked liquid staking token. Earn staking rewards across popular networks and
            the DeFi ecosystem. Plus, receive ether.fi loyalty points, EigenLayer points and many
            more partner rewards with your eETH.
          </p>
          <div className="w-[200px] h-[42px] bg-primary text-thirdary rounded-full mt-[52px] flex items-center justify-center button-hover mx-auto">
            Earn Now
          </div>
        </div>
        <div className="w-1/2">
          <Image src="/earn.png" alt="Earn" width={670} height={365} className="rounded-[20px]" />
        </div>
      </div>
    </section>
  );
};

export default Earn;