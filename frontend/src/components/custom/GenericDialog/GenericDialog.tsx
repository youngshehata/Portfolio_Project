import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import styles from "./GenericDialog.module.css";

interface Props {
  title: string;
  isOpen: boolean;
  handleClose: () => void;
  child: React.ReactNode;
  cssClass?: string;
}

export default function GenericDialog({
  title,
  child,
  cssClass,
  isOpen = false,
  handleClose,
}: Props) {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild></Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />

        <div className={`${styles.dialogWrapper} ${cssClass}`}>
          <Dialog.Content
            className={styles.dialogContent}
            aria-describedby={undefined}
          >
            <Dialog.DialogTitle style={{ display: "none" }}>
              {title}
            </Dialog.DialogTitle>
            {child}
            <Dialog.Close asChild>
              <img
                src="/icons/close.svg"
                alt="close"
                className={styles.closeBtn}
                onClick={handleClose}
              />
            </Dialog.Close>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
