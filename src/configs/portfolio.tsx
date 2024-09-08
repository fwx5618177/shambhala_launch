import Image from "next/image";
import moment from "moment";
import { RowObject } from "@/components/Table/types";
import { USDTVAULT_ERC20, USDT_ERC20 } from "@/commons/config";
import {
  readContract,
  writeContract,
  getTransactionReceipt,
  getAccount,
} from "@wagmi/core";
import { config } from "@/wagmi";
export const dataSource: RowObject[] = [
  {
    protocol: { src: "/fluid.svg", alt: "Fluid", label: "Fluid", size: 40 },
    network: { src: "/eth.svg", alt: "Ethereum", label: "Ethereum", size: 16 },
    amount: { fusdt: 2.017, usdt: -70.54 },
    investedProducts: "2",
    assets: "$7.73",
    date: Date.now(),
  },
  {
    protocol: { src: "/fluid.svg", alt: "Fluid", label: "Fluid", size: 40 },
    network: { src: "/eth.svg", alt: "Ethereum", label: "Ethereum", size: 16 },
    amount: { fusdt: 2.017, usdt: -70.54 },
    investedProducts: "2",
    assets: "$7.73",
    date: Date.now(),
  },
  {
    protocol: { src: "/fluid.svg", alt: "Fluid", label: "Fluid", size: 40 },
    network: { src: "/eth.svg", alt: "Ethereum", label: "Ethereum", size: 16 },
    amount: { fusdt: 2.017, usdt: -70.54 },
    investedProducts: "2",
    assets: "$7.73",
    date: Date.now(),
  },
];

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

// const [state, setState] = useState(0)
// const [busy, setBusy] = useState(false)
const pid = 2;

async function success(hash) {
  var retry = 5;
  while (retry > 0) {
    try {
      const res = await getTransactionReceipt(config, {
        hash,
      });
      console.log("getTransactionReceipt", res);
      if (res) {
        return res.status == "success";
      }
      retry--;
    } catch (e) {
      console.log(e);
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    }
  }
}

function getPoolState() {
  return readContract(config, {
    abi: USDTVAULT_ERC20.abi,
    address: USDTVAULT_ERC20.address,
    functionName: "poolState",
    args: [pid],
  });
}

function redeeming() {
  const account = getAccount(config);
  return writeContract(config, {
    abi: USDTVAULT_ERC20.abi,
    address: USDTVAULT_ERC20.address,
    functionName: "redeem",
    args: [pid],
    account: account.address,
  });
}

async function handleRedeemInternal(value: any) {
  // if (busy) {
  // 	return
  // }
  // setBusy(true)
  try {
    const poolState = await getPoolState();
    console.log("pool state", poolState);
    if (poolState != 2) {
      console.warn("The product has not yet expired");
      //$toast('The product has not yet expired')
      //todo
      return;
    }
    // setState(1)
    const hash = await redeeming();
    if (await success(hash)) {
      console.log("Redeem succeed");
      //toast success todo
    } else {
      console.warn("Redeem failed");
      //toast failed todo
    }
  } catch (e) {
    console.error(e);
    //toast error
    //todo
  } finally {
    // setBusy(false)
    // setState(0)
  }
}
const handleRedeem = (value: RowObject["action"]) => {
  handleRedeemInternal(value);
};

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
