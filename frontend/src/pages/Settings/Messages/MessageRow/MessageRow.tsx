import { TMessage } from "../../../../common/types/message.type";
import LabelValue from "../LabelValue/LabelValue";
import styles from "./MessageRow.module.css";

interface Props {
  index: number;
  message: TMessage;
  markAsRead: () => void;
}
export default function MessageRow({ index, message, markAsRead }: Props) {
  return (
    <tr onClick={() => markAsRead()}>
      <td>
        <div className={styles.merger}>
          <div
            className={`${styles.container} ${message.isRead && styles.read}`}
          >
            <span
              className={`${styles.index} ${
                message.isRead && styles.indexRead
              }`}
            >
              {index}
            </span>
            <LabelValue label="Title:" value={message.title}></LabelValue>
            <div>
              <LabelValue label="From:" value={message.from}></LabelValue>
              <LabelValue label="Date:" value={message.date}></LabelValue>
            </div>
            <LabelValue
              label="Message:"
              value={message.message}
              cssClass={styles.message}
            ></LabelValue>
          </div>
        </div>
      </td>
    </tr>
  );
}
