import { API_URL } from "../../../api/axiosClient";
import styles from "./ContactMethod.module.css";

interface Props {
  icon: string;
  label?: string;
  onClick?: () => void;
  cssClass?: string;
}

export default function ContactMethod({
  icon,
  label,
  onClick,
  cssClass,
}: Props) {
  return (
    <div onClick={onClick} className={`${styles.container} ${cssClass}`}>
      <img
        className={styles.image}
        src={`${API_URL}${icon}`}
        alt="contact-method"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            "/icons/default_contact.svg";
        }}
      />
      {label ? <span>{label}</span> : null}
    </div>
  );
}
