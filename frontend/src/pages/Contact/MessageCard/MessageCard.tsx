import toast from "react-hot-toast";
import styles from "./MessageCard.module.css";
import { useState } from "react";
import { ContactAPI } from "../../../api/contactApi";

export default function MessageCard() {
  const [formData, setFormData] = useState({
    from: "",
    title: "",
    message: "",
  });

  const checkLength = (text: string, minimum: number) => {
    return text.length >= minimum;
  };

  const validateForm = () => {
    if (!formData.from || !formData.title || !formData.message) return false;
    return (
      checkLength(formData.from, 2) &&
      checkLength(formData.title, 2) &&
      checkLength(formData.message, 2)
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid)
      return toast.error(
        "All fields are required, with a minimum of 2 characters"
      );
    ContactAPI.sendMessage({
      ...formData,
      id: 0,
      isRead: false,
      date: new Date().toString(),
    })
      .then(() => {
        toast.success("Message delivered, Thank you for getting in touch");
        setFormData({
          from: "",
          title: "",
          message: "",
        });
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Something went wrong");
      });
  };
  return (
    <div className={styles.container}>
      <span className={styles.title}>Send me a message</span>
      <div className={styles.underline}></div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          placeholder="Your Email"
          className={`${styles.input}`}
          type="text"
          onChange={(e) => {
            setFormData({ ...formData, from: e.target.value });
          }}
          spellCheck={"false"}
          value={formData.from}
        />
        <input
          placeholder="Title"
          className={`${styles.input}`}
          type="text"
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
          }}
          value={formData.title}
        />
        <textarea
          placeholder="Message"
          className={`${styles.textArea}`}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
          }}
          value={formData.message}
        ></textarea>
        <button className={`${styles.button} buttonHover`}>Send</button>
      </form>
    </div>
  );
}
