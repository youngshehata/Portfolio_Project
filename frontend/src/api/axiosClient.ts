import axios from "axios";
import { TMethod } from "./fetcher";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default axiosClient;

export const API_URL = import.meta.env.VITE_API_URL;

export type TEndpoint = {
  url: string;
  method: TMethod;
};
