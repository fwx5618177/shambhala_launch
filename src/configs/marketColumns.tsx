import moment from "moment";
import { RowObject } from "@/components/Table/types";

export const marketColumns = [
  {
    title: <span className="flex items-center justify-start text-xs sm:text-sm lg:text-base">Date</span>,
    dataIndex: "date",
    key: "updatedAt",
    render: (value: RowObject["date"]) => (
      <span className="w-full text-primary flex items-center justify-start text-xs sm:text-sm lg:text-base">
        {moment(value).format("YYYY/MM/DD HH:mm")}
      </span>
    ),
  },
  {
    title: <span className="flex items-center justify-start text-xs sm:text-sm lg:text-base">Activity</span>,
    dataIndex: "type",
    key: "type",
    render: (value: any) => {
      return (
        <span className="w-full text-primary flex items-center justify-start text-xs sm:text-sm lg:text-base">
          {value == 1 ? "Referral" : value == 2 ? "Staking" : ""}
        </span>
      );
    },
  },
  {
    title: <span className="flex items-center justify-start text-xs sm:text-sm lg:text-base">Details</span>,
    dataIndex: "details",
    key: "details",
    render: (value: any) => (
      <span className="w-full text-primary flex items-center justify-start text-xs sm:text-sm lg:text-base">
        {value}
      </span>
    ),
  },
  {
    title: <span className="flex items-center justify-center text-xs sm:text-sm lg:text-base">Rewards</span>,
    dataIndex: "pointChange",
    key: "pointChange",
    render: (value: any) => {
      return (
        <span className="w-full text-primary flex items-center justify-center text-xs sm:text-sm lg:text-base">
          {value} Points
        </span>
      );
    },
  },
];