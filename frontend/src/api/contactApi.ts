import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "../common/constraints/pagination.constraints";
// import type { TMessage } from "../common/types/message.type";
import axiosClient from "./axiosClient";

export const ContactAPI = {
  getData: async (page: number, pageSize: number) =>
    axiosClient.get(
      `contacts/many?page=${page || DEFAULT_PAGE}&pageSize=${
        pageSize || DEFAULT_PAGE_SIZE
      }`
    ),
  sendMessage: async (data: any) => {
    return axiosClient.post("messages", data);
  },
};
