import * as Dialog from "@radix-ui/react-dialog";
import { useRef, useState } from "react";
import styles from "./RadixDialog.module.css";

interface Props {
  title: string;
  handleSubmit: (value: string) => void;
  cssClass?: string;
  inputType?: "input" | "textArea";
}

export const RadixDialog = ({
  title,
  handleSubmit,
  cssClass,
  inputType = "input",
}: Props) => {
  const inputRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <img
          className={`${styles.trigger} ${
            inputType == "textArea" && styles.textAreaTrigger
          }`}
          src="/icons/edit.svg"
          alt="edit"
        />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />

        {/* WRAPPER: fixed & centered */}
        <div className={`${styles.dialogWrapper} ${cssClass}`}>
          <Dialog.Content
            className={styles.dialogContent}
            aria-describedby={undefined}
            onOpenAutoFocus={(event) => {
              event.preventDefault();
              if (inputRef.current) {
                (
                  inputRef.current as HTMLInputElement | HTMLTextAreaElement
                ).focus();
              }
            }}
          >
            <Dialog.DialogTitle style={{ display: "none" }}>
              {title}
            </Dialog.DialogTitle>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSubmit(inputValue);
                setOpen(false);
              }}
            >
              <h2 className={styles.title}>{title}</h2>
              {inputType === "input" ? (
                <input
                  onChange={(e) => setInputValue(e.target.value)}
                  ref={inputRef}
                  className={styles.input}
                />
              ) : (
                <textarea
                  onChange={(e) => setInputValue(e.target.value)}
                  ref={inputRef}
                  className={styles.textArea}
                />
              )}

              <div className={styles.buttonContainer}>
                <button className={styles.button} type="submit">
                  Submit
                </button>
              </div>
            </form>

            <Dialog.Close asChild>
              <img
                src="/icons/close.svg"
                alt="close"
                className={styles.closeBtn}
              />
            </Dialog.Close>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
