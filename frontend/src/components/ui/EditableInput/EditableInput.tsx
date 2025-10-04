import { RadixDialog } from "../../radix/Dialog/RadixDialog";
import styles from "./EditableInput.module.css";

interface Props {
  label: string;
  value: string;
  inputType?: "input" | "textArea";
  cssClass?: string;
  onSubmit: (newValue: string) => void;
}
export default function EditableInput({
  label,
  value,
  cssClass,
  onSubmit,
  inputType = "input",
}: Props) {
  return (
    <div className={`${styles.container} ${cssClass}`}>
      <span className={styles.label}>{label}</span>
      <div className={styles.valueContainer}>
        {inputType === "input" ? (
          <input
            name="input"
            onChange={() => {}}
            type="text"
            value={value}
            className={`${styles.input}`}
          />
        ) : (
          <textarea
            name="textArea"
            onChange={() => {}}
            value={value}
            className={`${styles.input}`}
          />
        )}
        <RadixDialog
          title={`Edit ${label}:`}
          handleSubmit={onSubmit}
          inputType={inputType}
        />
      </div>
    </div>
  );
}
