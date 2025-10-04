import type { TSkill } from "../../../../common/types/skill.type";
import Skill from "../../Skill/Skill";
import styles from "./Technologies.module.css";

interface Props {
  list: TSkill[];
}
export default function Technologies({ list }: Props) {
  return (
    <div className={`${styles.container} scroll`}>
      <span className={styles.title}>{`Technologies: ${list.length}`}</span>
      <ul className={`${styles.list}`}>
        {list.map((item) => (
          <Skill
            key={item.name}
            name={item.name}
            image={item.icon}
            cssClass={styles.skillClass}
          />
        ))}
      </ul>
    </div>
  );
}
