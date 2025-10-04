import * as Dialog from "@radix-ui/react-dialog";
import styles from "./AddDialog.module.css";
import ButtonWithIcon from "../../../components/ui/ButtonWithIcon/ButtonWithIcon";

interface Props {
  categoryName: string;
  child: React.ReactNode;
  cssClass?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void; // instead of only onClose
}

export default function AddDialog({
  categoryName,
  child,
  cssClass,
  isOpen,
  onOpenChange,
}: Props) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <ButtonWithIcon
          icon="/icons/add.svg"
          label={`Add new ${categoryName}`}
          cssClass={styles.buttonCssClass}
        />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay} />
        <div className={`${styles.dialogWrapper} ${cssClass}`}>
          <Dialog.Content
            className={styles.dialogContent}
            aria-describedby={undefined}
          >
            <Dialog.DialogTitle style={{ display: "none" }}>
              {`Add new ${categoryName}`}
            </Dialog.DialogTitle>
            {child}
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
}
