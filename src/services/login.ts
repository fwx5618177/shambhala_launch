import api from "@/lib/interceptors";
import { ApiResponse, LoginRequest, LoginResponse } from "./types";

/**
 * 登录请求
 * @param params 登录参数
 * @returns 登录后的用户信息和 token
 */
export async function login({
  walletAddr,
  text,
  signature,
}: LoginRequest): Promise<LoginResponse> {
  const inviteCode = localStorage.getItem("inviteCode") || "";

  const response = await api.post<ApiResponse<LoginResponse>>(
    "/v1/user/login",
    {
      walletAddr,
      text,
      signature,
      inviteCode,
    }
  );

  return response.data.data;
}
