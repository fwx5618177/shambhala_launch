import { message } from "@/providers/MessageProvider";

export interface InvestmentItem {
  pid: number;
  address: string;
}

export const fetchInvestments = async (
  address: string
): Promise<InvestmentItem[]> => {
  const apiUrl =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_API_URL_DEV
      : process.env.NEXT_PUBLIC_API_URL_PROD;

  try {
    const response = await fetch(`${apiUrl}/invest/v1/profile/ids/${address}`);
    const data = await response.json();
    if (data.code === 200) {
      return data.data.investing;
    } else {
      throw new Error(data.message || "Failed to fetch investments");
    }
  } catch (error) {
    message.error(`Failed to fetch investments: ${JSON.stringify(error)}`);
    throw error;
  }
};
