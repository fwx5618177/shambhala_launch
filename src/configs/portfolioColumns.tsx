import Image from "next/image";
import moment from "moment";
import { RowObject } from "@/components/Table/types";

export const baseColumns = [
  {
    title: "Protocol",
    dataIndex: "protocol",
    key: "protocol",
    render: (value: RowObject["protocol"]) => (
      <div className="flex items-center space-x-4">
        <Image
          src={value.src}
          alt={value.alt}
          width={value.size || 40}
          height={value.size || 40}
        />
        <span>{value.label}</span>
      </div>
    ),
  },
  {
    title: "Network",
    dataIndex: "network",
    key: "network",
    render: (value: RowObject["network"]) => (
      <div className="flex items-center space-x-2">
        <Image
          src={value.src}
          alt={value.alt}
          width={value.size || 16}
          height={value.size || 16}
        />
        <span>{value.label}</span>
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
      <div className="w-full flex flex-col items-end justify-center gap-[2px]">
        <span className="text-success text-coinSm font-500">
          {value?.fusdt} FUSDT
        </span>
        <span className="text-secondary text-[13px] font-500">
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
      <span className="w-full text-secondary flex items-center justify-end">
        {moment(value).format("YYYY/MM/DD HH:mm")}
      </span>
    ),
  },
];

export const defiColumns = [
  ...baseColumns,
  {
    title: "Invested products",
    dataIndex: "investedProducts",
    key: "investedProducts",
  },
  {
    title: "Assets",
    dataIndex: "assets",
    key: "assets",
  },
];

export const DetailColumns = [
  {
    title: "Protocol",
    dataIndex: "protocol",
    key: "protocol",
    render: (value: RowObject["protocol"]) => (
      <div className="flex items-center space-x-4">
        <Image
          src={value.src}
          alt={value.alt}
          width={value.size || 40}
          height={value.size || 40}
        />
        <span>{value.label}</span>
      </div>
    ),
  },
  {
    title: "Assets",
    dataIndex: "assets",
    key: "assets",
  },
  {
    title: "Claimable rewards",
    dataIndex: "claimableRewards",
    key: "claimableRewards",
    render: (value: RowObject["claimableRewards"]) => (
      <span className="text-primary">{value}</span>
    ),
  },
  {
    title: "Total value",
    dataIndex: "totalValue",
    key: "totalValue",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (value: RowObject["action"]) => (
      <div
        className="bg-[#0D0D0D] text-thirdary py-[11px] px-[22px] rounded-[30px] curosr-pointer button-hover"
        onClick={() => handleRedeem(value)}
      >
        Redeem
      </div>
    ),
  },
];

const handleRedeem = (value: RowObject["action"]) => {};

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
