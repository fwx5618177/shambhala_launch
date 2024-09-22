import Image from "next/image";
import moment from "moment";
import { RowObject } from "@/components/Table/types";

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
