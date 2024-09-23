export interface ApiResponse<T> {
  code: number;
  data: T;
  message?: string;
}

export interface SignContentResponse {
  text: string;
}

export interface LoginRequest {
  walletAddr: string;
  text: string;
  signature: string;
  inviteCode?: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    walletAddr: string;
  };
}
