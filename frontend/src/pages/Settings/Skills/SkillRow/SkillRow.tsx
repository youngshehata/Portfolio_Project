import { API_URL } from "../../../../api/axiosClient";
import { TSkill } from "../../../../common/types/skill.type";
import styles from "./SkillRow.module.css";

interface Props {
  skill: TSkill;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}
export default function SkillRow({ skill, index, onEdit, onDelete }: Props) {
  return (
    <tr className={styles.container}>
      <td>{index}</td>
      <td>{skill.name}</td>
      <td>
        <img
          className={styles.icon}
          src={`${API_URL}${skill.icon}`}
          alt="icon"
        />
      </td>
      <td>
        {skill.showOnPortfolio ? (
          <img
            className={styles.checked}
            src="/icons/checked.svg"
            alt="Showed"
          />
        ) : (
          <img
            className={styles.checked}
            src="/icons/unchecked.svg"
            alt="Not Showed"
          />
        )}
      </td>
      <td>
        <div className={styles.buttonsContainer}>
          <button onClick={onEdit} className={styles.edit}>
            Edit
          </button>
          <button onClick={onDelete} className={styles.delete}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
