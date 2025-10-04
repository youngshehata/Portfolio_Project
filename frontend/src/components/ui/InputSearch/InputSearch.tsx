import { useState } from "react";
import styles from "./InputSearch.module.css";

interface Props {
  handleSearch: (value: string) => void;
  cssClass?: string;
}
export default function InputSearch({ cssClass, handleSearch }: Props) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={`${cssClass} ${styles.container}`}>
      <input
        spellCheck={"false"}
        className={styles.input}
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(inputValue);
          }
        }}
      />
      <img
        className={styles.icon}
        src="/icons/search.svg"
        alt="search"
        onClick={() => handleSearch(inputValue)}
      />
    </div>
  );
}
