export const levelColumns = [
  {
    title: "Level",
    dataIndex: "level",
    key: "level",
  },
  {
    title: "Basic Reward",
    dataIndex: "basicReward",
    key: "basicReward",
    render: (value: any) => {
      return <span className="text-[16px] font-400">{value} pt/user</span>;
    },
  },
  {
    title: "Extra Reward",
    dataIndex: "extraReward",
    key: "extraReward",
    render: (value: any) => {
      return (
        <span className="text-success text-[16px] font-400">
          + {value * 100}% pt/user
        </span>
      );
    },
  },
];
