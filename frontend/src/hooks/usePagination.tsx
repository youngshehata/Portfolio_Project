import { useState, useEffect } from "react";

export function usePagination<T>(
  fetchFn: (
    page: number,
    pageSize: number
  ) => Promise<{ data: T[]; total: number }>,
  pageSize: number
) {
  const [data, setData] = useState<T[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPage = async (page: number) => {
    return fetchFn(page, pageSize).then((res) => {
      // setData(res.data.sort((a: any, b: any) => a.id - b.id));
      setData(res.data);
      setTotalResults(res.total);
      setCurrentPage(page);
    });
  };

  const nextPage = () =>
    currentPage < Math.ceil(totalResults / pageSize) &&
    fetchPage(currentPage + 1);

  const prevPage = () => currentPage > 1 && fetchPage(currentPage - 1);

  const firstPage = () => fetchPage(1);

  const lastPage = () => fetchPage(Math.ceil(totalResults / pageSize));

  useEffect(() => {
    fetchPage(1);
  }, []);

  return {
    data,
    totalResults,
    currentPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage,
    setData,
  };
}
