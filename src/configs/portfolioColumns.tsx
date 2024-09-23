import Image from "next/image";
import moment from "moment";
import { RowObject } from "@/components/Table/types";

export const baseColumns = [
  {
    title: "Protocol",
    dataIndex: "protocol",
    key: "protocol",
    render: (value: RowObject["protocol"]) => (
      <div className="flex items-center space-x-2 sm:space-x-4">
        <Image
          src={value.src}
          alt={value.alt}
          width={value.size || 14}
          height={value.size || 14}
          className="w-[14px] h-[14px] sm:w-[40px] sm:h-[40px]"
        />
        <span className="text-xs sm:text-sm lg:text-base">{value.label}</span>
      </div>
    ),
  },
  {
    title: "Network",
    dataIndex: "network",
    key: "network",
    render: (value: RowObject["network"]) => (
      <div className="flex items-center space-x-1 sm:space-x-2">
        <Image
          src={value.src}
          alt={value.alt}
          width={value.size || 14}
          height={value.size || 14}
          className="sm:w-[16px] sm:h-[16px]"
        />
        <span className="text-xs sm:text-sm lg:text-base">{value.label}</span>
      </div>
    ),
  },
];

export const transactionsColumns = [
  ...baseColumns,
  {
    title: <span className="flex items-center justify-end">Amount</span>,
    dataIndex: "amount",
    key: "amount",
    render: (value: RowObject["amount"]) => (
      <div className="w-full flex flex-col items-end justify-center gap-1 sm:gap-[2px]">
        <span className="text-success text-[10px] sm:text-coinSm font-500">
          {value?.fusdt} FUSDT
        </span>
        <span className="text-secondary text-[10px] sm:text-[13px] font-500">
          {value?.usdt} USDT
        </span>
      </div>
    ),
  },
  {
    title: <span className="flex items-center justify-end">Date</span>,
    dataIndex: "date",
    key: "date",
    render: (value: RowObject["date"]) => (
      <span className="w-full text-secondary text-[10px] sm:text-[12px] flex items-center justify-end">
        {moment(value).format("YYYY/MM/DD HH:mm")}
      </span>
    ),
  },
];

export const defiColumns = [
  ...baseColumns,
  {
    title: (
      <span className="w-full text-center sm:text-left">Invested products</span>
    ),
    dataIndex: "investedProducts",
    key: "investedProducts",
    render: (value: any) => (
      <span className="w-full text-center text-xs sm:text-left sm:text-sm lg:text-base">{value}</span>
    ),
  },
  {
    title: "Assets",
    dataIndex: "assets",
    key: "assets",
    render: (value: any) => (
      <span className="text-xs sm:text-sm lg:text-base">{value}</span>
    ),
  },
];

export const DetailColumns = [
  {
    title: "Protocol",
    dataIndex: "protocol",
    key: "protocol",
    render: (value: RowObject["protocol"]) => (
      <div className="flex items-center space-x-2 sm:space-x-4">
        <Image
          src={value.src}
          alt={value.alt}
          width={value.size || 14}
          height={value.size || 14}
          className="w-[14px] h-[14px] sm:w-[40px] sm:h-[40px]"
        />
        <span className="text-xs sm:text-sm lg:text-base">{value.label}</span>
      </div>
    ),
  },
  {
    title: "Assets",
    dataIndex: "assets",
    key: "assets",
    render: (value: any) => (
      <span className="text-xs sm:text-sm lg:text-base">{value}</span>
    ),
  },
  {
    title: "Claimable rewards",
    dataIndex: "claimableRewards",
    key: "claimableRewards",
    render: (value: RowObject["claimableRewards"]) => (
      <span className="text-primary text-xs sm:text-sm lg:text-base">{value}</span>
    ),
  },
  {
    title: "Total value",
    dataIndex: "totalValue",
    key: "totalValue",
    render: (value: any) => (
      <span className="text-xs sm:text-sm lg:text-base">{value}</span>
    ),
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (value: RowObject["action"]) => (
      <div
        className="bg-[#0D0D0D] text-thirdary py-1 sm:py-[11px] px-3 sm:px-[22px] rounded-[20px] sm:rounded-[30px] cursor-pointer button-hover text-xs sm:text-sm"
        onClick={() => handleRedeem(value)}
      >
        Redeem
      </div>
    ),
  },
];

const handleRedeem = (value: RowObject["action"]) => { };

export const switchColumns = (type: "defi" | "transactions" | "detail") => {
  switch (type) {
    case "defi":
      return defiColumns;
    case "transactions":
      return transactionsColumns;
    case "detail":
    default:
      return DetailColumns;
  }
};