import styles from "./NavbarToggler.module.css";

interface Props {
  isExpanded: boolean;
  handleToggle: () => void;
}
export default function NavbarToggler({ isExpanded, handleToggle }: Props) {
  return (
    <div
      className={`${styles.container} ${isExpanded ? styles.expanded : ""}`}
      onClick={handleToggle}
    >
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
    </div>
  );
}
