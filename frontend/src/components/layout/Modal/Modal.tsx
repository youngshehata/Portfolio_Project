import { useEffect, useState } from "react";
import styles from "./Modal.module.css";

interface Props {
  title: string;
  message: string;
  noFunction: () => void;
  yesFunction: () => void;
}
export default function Modal({
  title,
  message,
  yesFunction,
  noFunction,
}: Props) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setOpened(true);
  }, []);
  return (
    <div className={styles.container}>
      <main className={`${styles.modal} ${opened && styles.modalOpened}`}>
        <img
          onClick={noFunction}
          className={styles.close}
          src="/icons/close.svg"
          alt="close"
        />
        <span className={styles.title}>{title}</span>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttonsContainer}>
          <button className={styles.yesButton} onClick={yesFunction}>
            Yes
          </button>
          <button className={styles.noButton} onClick={noFunction}>
            No
          </button>
        </div>
      </main>
    </div>
  );
}
