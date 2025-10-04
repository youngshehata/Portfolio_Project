import toast from "react-hot-toast";
import type { TContact } from "../../../common/types/contact.type";
import ContactMethod from "../../../components/ui/ContactMethod/ContactMethod";
import styles from "./ContactMethods.module.css";

interface Props {
  children: TContact[];
}

export default function ContactMethods({ children }: Props) {
  const copyTextToClipboard = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => toast.success("Copied to clipboard"))
        .catch(() => toast.error("Failed to copy"));
    } else {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      toast.success("Copied to clipboard");
    }
  };
  return (
    <div className={styles.container}>
      <span className={styles.title}>
        {`Contact methods: (${children.length})`}
      </span>
      <div className={styles.underline}></div>
      <ul className={`${styles.list} scroll`}>
        {children.map((item) => (
          <div key={item.id} className={styles.contactMethodContainer}>
            <ContactMethod
              key={item.id}
              icon={item.icon}
              label={item.name}
              onClick={() => window.open(item.value, "_blank")}
              cssClass={styles.contactMethod}
            />
            <div className={styles.valueContainer}>
              <span>{item.value}</span>
              <img
                src="/icons/copy.svg"
                alt="copy"
                onClick={() => copyTextToClipboard(item.value)}
              />
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
