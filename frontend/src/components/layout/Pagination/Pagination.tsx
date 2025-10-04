import styles from "./Pagination.module.css";
import { DEFAULT_PAGE_SIZE } from "../../../common/constraints/pagination.constraints";
import type { TPagination } from "../../../common/types/pagination.type";

export default function Pagination({
  handleClickNext,
  handleClickPrevious,
  handleClickLastPage,
  handleClickFirstPage,
  listLength,
  currentPage,
}: TPagination) {
  return (
    <div className={styles.container}>
      <img
        className={`${styles.forwardArror} ${styles.rotated180}`}
        src="/icons/forwardArrow.svg"
        alt="first"
        onClick={handleClickFirstPage}
      />
      <img
        className={`${styles.nextArrow} ${styles.rotated180}`}
        src="/icons/nextArrow.svg"
        alt="first"
        onClick={handleClickPrevious}
      />

      <p className={styles.text}>
        Page {currentPage} of {Math.ceil(listLength / DEFAULT_PAGE_SIZE)}
      </p>
      <img
        className={styles.nextArrow}
        src="/icons/nextArrow.svg"
        alt="first"
        onClick={handleClickNext}
      />
      <img
        className={styles.forwardArror}
        src="/icons/forwardArrow.svg"
        alt="first"
        onClick={handleClickLastPage}
      />
    </div>
  );
}
