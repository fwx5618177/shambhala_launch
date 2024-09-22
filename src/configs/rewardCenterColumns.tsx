import { RowObject } from "@/components/Table/types";

const handleRedeem = (value: RowObject["action"]) => {};

export const rewardCenterColumns = [
  {
    title: <span className="flex items-center justify-center">Points</span>,
    dataIndex: "rewards",
    key: "rewards",
    render: (value: any) => {
      return (
        <span className="w-full text-primary flex items-center justify-start">
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
        <span className="w-full text-primary flex items-center justify-center">
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
        <div className="w-full flex justify-end">
          <span
            className="bg-[#0D0D0D] text-thirdary py-[11px] px-[22px] rounded-[30px] curosr-pointer button-hover"
            onClick={() => handleRedeem(value)}
          >
            Redeem
          </span>
        </div>
      );
    },
  },
];
