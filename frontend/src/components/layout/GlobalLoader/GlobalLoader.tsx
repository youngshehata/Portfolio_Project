import { useLoading } from "../../../contexts/LoadingContext";
import styles from "./GlobalLoader.module.css";
export const GlobalLoader = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
};
