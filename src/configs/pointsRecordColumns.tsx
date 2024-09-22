import moment from "moment";
import { RowObject } from "@/components/Table/types";

export const pointsRecordColumns = [
  {
    title: <span className="flex items-center justify-start">Date</span>,
    dataIndex: "createdAt",
    key: "createdAt",
    render: (value: RowObject["date"]) => (
      <span className="w-full text-primary flex items-center justify-start">
        {moment(value).format("YYYY.MM.DD HH:mm")}
      </span>
    ),
  },
  {
    title: "Details",
    dataIndex: "type",
    key: "type",
    render: (value: any) => {
      return (
        <span className="w-full text-primary flex items-center justify-start">
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
