import React from "react";
import { TPagination } from "../../common/types/pagination.type";
import DynamicTable, {
  TColumn,
} from "../../components/custom/DynamicTable/DynamicTable";
import Pagination from "../../components/layout/Pagination/Pagination";
import InputSearch from "../../components/ui/InputSearch/InputSearch";
import AddDialog from "./AddDialog/AddDialog";
import styles from "./SearchableList.module.css";

interface Props<T> extends TPagination {
  categoryName: string;
  headersList: { label: string; value: string }[];
  tableColumns: TColumn[];
  data: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
  searchFunction: (value: string) => void;
  dialogComponent?: React.ReactNode; // child dialog used for "Add"
  dialogOpen?: boolean;
  onDialogOpenChange?: () => void;
}

export default function SearchableList<T>({
  categoryName,
  headersList,
  tableColumns,
  data,
  renderRow,
  searchFunction,
  dialogComponent,
  dialogOpen,
  onDialogOpenChange,
  handleClickNext,
  handleClickPrevious,
  handleClickLastPage,
  handleClickFirstPage,
  currentPage,
  listLength,
}: Props<T>) {
  return (
    <div className={styles.container}>
      {/* HEADERS */}
      <div className={styles.headers}>
        {dialogComponent && typeof onDialogOpenChange === "function" && (
          <AddDialog
            categoryName={categoryName}
            child={dialogComponent}
            isOpen={!!dialogOpen}
            onOpenChange={onDialogOpenChange}
          />
        )}

        {headersList.map((header) => (
          <div className={styles.header} key={header.label}>
            <span className={styles.headerLabel}>{header.label}</span>
            <span className={styles.headerValue}>{header.value}</span>
          </div>
        ))}
      </div>

      {/* LIST */}
      <div className={styles.searchListContainer}>
        <InputSearch
          cssClass={styles.inputSearch}
          handleSearch={searchFunction}
        />
        <DynamicTable
          columns={tableColumns}
          rows={data.map((item, i) => renderRow(item, i))}
        />
      </div>

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        handleClickFirstPage={handleClickFirstPage}
        handleClickLastPage={handleClickLastPage}
        handleClickNext={handleClickNext}
        handleClickPrevious={handleClickPrevious}
        listLength={listLength}
      />
    </div>
  );
}
