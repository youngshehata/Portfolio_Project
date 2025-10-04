import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "../common/constraints/pagination.constraints";

export const MessagessApi = {
  getData: (
    page: number,
    pageSize: number,
    sort?: "newest" | "oldest",
    isRead?: "1" | "0"
  ) => {
    return `messages/many?page=${page || DEFAULT_PAGE}&pageSize=${
      pageSize || DEFAULT_PAGE_SIZE
    }${sort ? `&sort=${sort}` : ""}${isRead ? `&isRead=${isRead}` : ""}`;
  },

  editMessage: (id: number) => `http://localhost:3000/messages/${id}`,
};
