import moment from "moment";
import { RowObject } from "@/components/Table/types";

export const referralDetailColumns = [
  {
    title: <span className="flex items-center justify-start">Date</span>,
    dataIndex: "updateAt",
    key: "updateAt",
    render: (value: RowObject["date"]) => (
      <span className="w-full text-primary flex items-center justify-start">
        {moment(value).format("YYYY.MM.DD HH:mm")}
      </span>
    ),
  },
  {
    title: "Address",
    dataIndex: "userId",
    key: "userId",
  },
  {
    title: <span className="flex items-center justify-center">Type</span>,
    dataIndex: "type",
    key: "type",
    render: (value: any) => {
      return (
        <span className="w-full text-primary flex items-center justify-center">
          {value == 1 ? "Refarral" : value == 2 ? "Staking" : ""}
        </span>
      );
    },
  },
  {
    title: <span className="flex items-center justify-center">Points</span>,
    dataIndex: "pointChange",
    key: "pointChange",
    render: (value: any) => {
      return (
        <span className="w-full text-primary flex items-center justify-center">
          + {value} Points
        </span>
      );
    },
  },
];
