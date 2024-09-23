// useStore.ts
import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { login as loginAPI } from "@/services/login";

// 定义状态和更新函数的类型
interface UserInfo {
  token?: string;
  address?: string;
}

interface IntegralInfo {
  points?: number;
  level?: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

interface StoreState {
  isLogin: boolean;
  userInfo: UserInfo;
  integralInfo: IntegralInfo;
  productArray: Product[];
  updateUserInfo: (info: UserInfo) => void;
  updateIntegralInfo: (info: IntegralInfo) => void;
  updateProductArray: (products: Product[]) => void;
  updateIsLogin: (flag: boolean) => void;
  login: (walletAddr: string, text: string, signature: string) => Promise<void>;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      isLogin: false,
      userInfo: {},
      integralInfo: {},
      productArray: [],
      updateUserInfo: (info) => set({ userInfo: info }),
      updateIntegralInfo: (info) => set({ integralInfo: info }),
      updateProductArray: (products) => set({ productArray: products }),
      updateIsLogin: (flag) => set({ isLogin: flag }),

      // 更新 login 方法
      login: async (walletAddr, text, signature) => {
        try {
          const response = await loginAPI({ walletAddr, text, signature });
          const { token, user } = response;

          // 更新状态
          set({
            userInfo: { token, address: user.walletAddr },
            isLogin: true,
          });

          localStorage.setItem("token", token);
        } catch (error) {
          console.error("Login failed:", error);
          throw error;
        }
      },
    }),
    {
      name: "shambhala",
    }
  )
);

export default useStore;
