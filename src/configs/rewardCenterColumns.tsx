import { RowObject } from "@/components/Table/types";

const handleRedeem = (value: RowObject["action"]) => { };

export const rewardCenterColumns = [
  {
    title: <span className="flex items-center justify-center">Points</span>,
    dataIndex: "rewards",
    key: "rewards",
    render: (value: any) => {
      return (
        <span className="w-full text-primary flex items-center justify-start text-xs sm:text-sm lg:text-base">
          + {value} Points
        </span>
      );
    },
  },
  {
    title: "reward",
    dataIndex: "reward",
    key: "reward",
    render: (value: any) => {
      return (
        <span className="w-full text-primary flex items-center justify-center text-xs sm:text-sm lg:text-base">
          + {value} Points
        </span>
      );
    },
  },
  {
    title: "action",
    dataIndex: "action",
    key: "action",
    render: (value: any) => {
      return (
        <div className="w-full flex justify-center lg:justify-end">
          <span
            className="bg-[#0D0D0D] text-thirdary py-2 px-3 sm:py-[8px] sm:px-[14px] lg:py-[11px] lg:px-[22px] rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] cursor-pointer button-hover text-xs sm:text-sm lg:text-base"
            onClick={() => handleRedeem(value)}
          >
            Redeem
          </span>
        </div>
      );
    },
  },
];