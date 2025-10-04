import { useEffect, useRef } from "react";
import styles from "./DynamicTable.module.css";

export type TColumn = {
  name: string;
  widthPercentage?: number;
};

interface Props {
  columns: TColumn[];
  rows: React.ReactNode[]; // each row is an object with keys matching column names
}

export default function DynamicTable({ columns, rows }: Props) {
  const listContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listContainerRef.current) {
      listContainerRef.current.scrollTop = 0;
    }
  }, [rows]);
  return (
    <div ref={listContainerRef} className={`${styles.container} scroll`}>
      <table className={styles.table} style={{ width: "100%" }}>
        <thead className={styles.tableHeader}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.name}
                style={{
                  width: col.widthPercentage
                    ? `${col.widthPercentage}%`
                    : undefined,
                  textAlign: "left",
                }}
              >
                {col.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows.map((row) => row)}</tbody>
      </table>
    </div>
  );
}
