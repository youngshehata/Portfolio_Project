import Skill from "../../../components/ui/Skill/Skill";
import styles from "./Stack.module.css";

type Skill = {
  id: number;
  name: string;
  icon: string;
  showOnPortfolio?: boolean;
};

interface Props {
  list: Skill[];
}
export default function Stack({ list }: Props) {
  return (
    <div className={`${styles.container} flex_column_center scroll`}>
      <div className={styles.title}>Stack:</div>
      <ul className={`${styles.list}`}>
        {list.map((item) => (
          <li key={item.id} className={`${styles.li} flex_row_center`}>
            <Skill
              key={item.id}
              image={item.icon}
              name={item.name}
              cssClass={styles.skillClass}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
