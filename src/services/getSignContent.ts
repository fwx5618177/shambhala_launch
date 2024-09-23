import api from "@/lib/interceptors";
import { ApiResponse, SignContentResponse } from "./types";

/**
 * 获取签名内容
 * @returns 签名文本
 */
export async function getSignContent(): Promise<SignContentResponse> {
  const response = await api.get<ApiResponse<SignContentResponse>>(
    "/v1/user/signature/text"
  );
  return response.data.data;
}
