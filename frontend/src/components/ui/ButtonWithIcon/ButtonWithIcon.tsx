import styles from "./ButtonWithIcon.module.css";

interface Props {
  icon: string;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  cssClass?: string;
}

export default function ButtonWithIcon({
  icon,
  label,
  onClick,
  isActive = false,
  cssClass,
}: Props) {
  return (
    <div
      className={`${styles.container} ${cssClass} ${isActive && styles.active}`}
      onClick={onClick}
    >
      <span className={styles.label}>{label}</span>
      <img src={icon} alt={label} className={styles.icon} />
    </div>
  );
}
