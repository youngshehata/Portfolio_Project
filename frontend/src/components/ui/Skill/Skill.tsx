import { API_URL } from "../../../api/axiosClient";
import styles from "./Skill.module.css";
interface Props {
  name: string;
  image: string;
  cssClass?: string;
}
export default function Skill({ name, image, cssClass }: Props) {
  return (
    <main className={`${styles.container} ${cssClass}`}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={`${API_URL}${image}`}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/icons/default_skill.svg";
          }}
          alt={name}
        />
      </div>
      <span className={styles.name}>{name}</span>
    </main>
  );
}
