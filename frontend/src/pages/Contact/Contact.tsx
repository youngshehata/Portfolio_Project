import { useEffect, useState } from "react";
import type { TContact } from "../../common/types/contact.type";
import styles from "./Contact.module.css";
import ContactMethods from "./ContactMethods/ContactMethods";
import MessageCard from "./MessageCard/MessageCard";
import { ContactAPI } from "../../api/contactApi";

export default function Contact() {
  const [contactMethods, setContactMethods] = useState<TContact[]>([]);

  useEffect(() => {
    ContactAPI.getData(1, 100).then((res) => {
      const visibleOnly = res.data.data.data.filter(
        (item: TContact) => item.showOnContact
      );
      setContactMethods(visibleOnly);
    });
  }, []);
  return (
    <div className={styles.container}>
      <ContactMethods children={contactMethods}></ContactMethods>
      <MessageCard></MessageCard>
    </div>
  );
}
