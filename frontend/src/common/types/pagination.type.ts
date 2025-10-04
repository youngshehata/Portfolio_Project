export type TPagination = {
  handleClickNext: () => void;
  handleClickPrevious: () => void;
  handleClickLastPage: () => void;
  handleClickFirstPage: () => void;
  listLength: number;
  currentPage?: number;
};
