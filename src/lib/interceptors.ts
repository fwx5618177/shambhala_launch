import axios, { AxiosError, AxiosResponse } from "axios";
import { message } from "@/providers/MessageProvider";
import { ApiResponse } from "@/services/types";
import i18n from "i18next";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    message.error(i18n.t("requestError"));
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  <T>(
    response: AxiosResponse<ApiResponse<T>>
  ): AxiosResponse<ApiResponse<T>> | Promise<never> => {
    const { data } = response;

    if (data.code !== 0) {
      message.error(data.message || i18n.t("requestFailed"));
      return Promise.reject(new Error(data.message || "Error occurred"));
    }

    return response;
  },
  (error: AxiosError<ApiResponse<unknown>>) => {
    handleErrorResponse(error);
    return Promise.reject(error);
  }
);

/**
 * 处理错误响应
 * @param error AxiosError 实例
 */
function handleErrorResponse(error: AxiosError<ApiResponse<unknown>>) {
  const status = error.response?.status;

  switch (status) {
    case 401:
      message.error(i18n.t("unauthorized"));
      window.location.href = "/login";
      break;
    case 403:
      message.error(i18n.t("forbidden"));
      break;
    case 404:
      message.error(i18n.t("notFound"));
      break;
    case 500:
      message.error(i18n.t("serverError"));
      break;
    default:
      message.error(error.response?.data?.message || i18n.t("requestFailed"));
  }
}

export default api;
