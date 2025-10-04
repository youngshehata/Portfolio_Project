import type { TContact } from "../../../common/types/contact.type";
import ContactMethod from "../../../components/ui/ContactMethod/ContactMethod";
import styles from "./HomeContact.module.css";

interface Props {
  list: TContact[];
}
export default function HomeContact({ list }: Props) {
  const handleClick = (url: string): void => {
    window.open(url, "_blank");
  };

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {list.map(
          (item) =>
            item.showOnHome && (
              <ContactMethod
                key={item.id}
                icon={item.icon}
                onClick={() => handleClick(item.value)}
              />
            )
        )}
      </ul>
    </div>
  );
}
