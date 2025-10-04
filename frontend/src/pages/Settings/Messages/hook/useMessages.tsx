import toast from "react-hot-toast";
import { usePagination } from "../../../../hooks/usePagination";
import { fetcher } from "../../../../api/fetcher";
import { DEFAULT_PAGE_SIZE } from "../../../../common/constraints/pagination.constraints";
import { useLoading } from "../../../../contexts/LoadingContext";
import { MessagessApi } from "../../../../api/messagesApi";
import { TMessage } from "../../../../common/types/message.type";

export function useMessages() {
  const { activeLoading, stopLoading } = useLoading();

  const {
    data,
    totalResults,
    currentPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    setData,
  } = usePagination<TMessage>(async (page: number, pageSize: number) => {
    activeLoading();
    const response = await fetcher(
      MessagessApi.getData(page, pageSize, "newest"),
      "GET",
      true
    );
    stopLoading();
    return {
      data: response.data.data.data,
      total: response.data.data.totalCount,
    };
  }, DEFAULT_PAGE_SIZE);

  const markAsRead = async (id: number) => {
    try {
      activeLoading();
      await fetcher(MessagessApi.editMessage(id), "PATCH", { isRead: true });
      setData((prev) =>
        prev.map((message: TMessage) => {
          if (message.id === id) {
            return { ...message, isRead: true };
          }
          return message;
        })
      );
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
      throw err;
    } finally {
      stopLoading();
    }
  };

  const search = async () => {
    toast.error("Not implemented yet");
    // activeLoading();
    // try {
    //   const response = await fetcher(
    //     SkillsApi.getData(1, DEFAULT_PAGE_SIZE, undefined, value),
    //     "GET",
    //     true
    //   );
    //   setData(response.data.data.data);
    // } finally {
    //   stopLoading();
    // }
  };

  return {
    data,
    totalResults,
    currentPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    setData,
    markAsRead,
    search,
  };
}
