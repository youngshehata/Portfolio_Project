import toast from "react-hot-toast";
import axiosClient from "./axiosClient";

type TResponse<T> = {
  data: T | any;
  error: { status: number; message: string } | null;
  toastTheError?: boolean;
};

export type TMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export async function fetcher<T>(
  url: string,
  method: TMethod,
  data: any,
  toastTheError?: boolean
): Promise<TResponse<T>> {
  try {
    const response = await axiosClient.request({ url, method, data });
    const resData = await response.data;
    return { data: resData, error: null } as TResponse<T>;
  } catch (error: any) {
    const message = error.response?.data?.message || "Something went wrong";
    toastTheError && toast.error(message);
    return {
      data: null,
      error: { status: 500, message: "Internal Server Error" },
    } as TResponse<T>;
  }
}
