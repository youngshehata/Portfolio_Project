import { API_URL } from "../../../api/axiosClient";
import styles from "./PersonalCard.module.css";

interface Props {
  name: string;
  title: string;
  image: string;
  about: string;
}
export default function PersonalCard({ name, title, image, about }: Props) {
  return (
    // <div className={styles.main}>
    <>
      <div className={styles.container}>
        <img
          className={styles.image}
          src={`${API_URL}${image}`}
          alt={name}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/icons/default.svg";
          }}
        />
        <p className={styles.name}>{name}</p>
        <p className={styles.title}>{title}</p>
      </div>
      <p className={`${styles.about} scroll`}>{about}</p>
    </>
    // </div>
  );
}
