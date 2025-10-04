import { useEffect, useRef } from "react";
import type { TPagination } from "../../common/types/pagination.type";
import Pagination from "../../components/layout/Pagination/Pagination";
import styles from "./PaginatedList.module.css";

interface Props extends TPagination {
  childrenList: React.ReactNode[];
  title: string;
  totalResults?: number;
}

export default function PaginatedList({
  childrenList,
  title,
  totalResults,
  handleClickNext,
  handleClickPrevious,
  handleClickLastPage,
  handleClickFirstPage,
  currentPage,
}: Props) {
  const listContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTop = 0;
    }
  }, [currentPage]);
  return (
    <div className={styles.container}>
      <p className={styles.title}>{`${title} to view: ${totalResults}`}</p>
      <div ref={listContainerRef} className={`${styles.listContainer} scroll`}>
        {childrenList}
      </div>
      <Pagination
        currentPage={currentPage}
        handleClickFirstPage={handleClickFirstPage}
        handleClickLastPage={handleClickLastPage}
        handleClickNext={handleClickNext}
        handleClickPrevious={handleClickPrevious}
        listLength={totalResults || 0}
      ></Pagination>
    </div>
  );
}
