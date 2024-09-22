import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

// 定义状态和更新函数的类型
interface UserInfo {
  name?: string;
  email?: string;
  // 根据实际情况添加更多字段
}

interface IntegralInfo {
  points?: number;
  level?: string;
  // 根据实际情况添加更多字段
}

interface Product {
  id: number;
  name: string;
  price: number;
  // 根据实际情况添加更多字段
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
}

type StorePersist = PersistOptions<StoreState>;

const useStore = create<StoreState>()(
  persist<StoreState>(
    (set) => ({
      isLogin: false,
      userInfo: {},
      integralInfo: {},
      productArray: [],
      updateUserInfo: (info) => set({ userInfo: info }),
      updateIntegralInfo: (info) => set({ integralInfo: info }),
      updateProductArray: (products) => set({ productArray: products }),
      updateIsLogin: (flag) => set({ isLogin: flag }),
    }),
    {
      name: "shambhala",
    } as StorePersist
  )
);

export type { UserInfo, IntegralInfo, Product, StoreState, StorePersist };
export default useStore;
