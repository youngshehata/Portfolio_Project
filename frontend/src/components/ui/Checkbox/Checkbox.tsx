import styles from "./Checkbox.module.css";

interface Props {
  currentValue: boolean;
  onChange: (value: boolean) => void;
  hasBorders?: boolean;
  cssClass?: string;
}

export default function Checkbox({
  currentValue,
  onChange,
  hasBorders = false,
  cssClass,
}: Props) {
  const handleClick = () => onChange(!currentValue);

  return (
    <div
      className={`${styles.container} ${
        hasBorders ? styles.withBorders : styles.noBorders
      } ${cssClass}`}
      onClick={handleClick}
      role="checkbox"
      aria-checked={currentValue}
    >
      <img
        src={currentValue ? "/icons/checked.svg" : "/icons/unchecked.svg"}
        alt={currentValue ? "Checked" : "Unchecked"}
        className={`${styles.icon} ${
          currentValue ? styles.checked : styles.unchecked
        }`}
      />
    </div>
  );
}
