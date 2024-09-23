import { Product } from "@/store/useStore";

type ProductItem = Product & {
  network?: string;
  tvl?: string;
  maturity?: string;
  address?: string;
};

export interface ApiResponse {
  code: number;
  data: ProductItem[];
  message?: string;
}

export const getProductListApi = async (): Promise<Product[]> => {
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_API_URL_DEV
      : process.env.NEXT_PUBLIC_API_URL_PROD;

  try {
    const response = await fetch(apiUrl as string, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Error fetching product data:", response.statusText);
      return [];
    }

    const data: ApiResponse = await response.json();

    if (data.code === 200) {
      const arr = data.data || [];
      arr.forEach((item) => {
        item.abbrLogo = "USDT";
        item.abbrSubLogo = "/aave.png";
        item.abbrTitle = "USDT";
        item.abbrVersion = "SHAMBHALA";
        item.abbrExpireTime = item.maturity as string;
        item.network = "Ethereum";
        item.tvl = "";
        item.contractAddress = item.address as string;
      });
      return arr;
    }
    return [];
  } catch (error) {
    console.error("Error fetching product data:", error);
    return [];
  }
};
