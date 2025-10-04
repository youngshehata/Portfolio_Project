import styles from "./LabelValue.module.css";

interface Props {
  label: string;
  value: string;
  cssClass?: string;
}

export default function LabelValue({ label, value, cssClass }: Props) {
  return (
    <div className={`${styles.container} ${cssClass} scroll`}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
