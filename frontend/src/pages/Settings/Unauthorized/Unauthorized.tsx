import { useState } from "react";
import ButtonWithIcon from "../../../components/ui/ButtonWithIcon/ButtonWithIcon";
import styles from "./Unauthorized.module.css";
import { SettingsAPI } from "../../../api/settingsApi";
import toast from "react-hot-toast";

interface Props {
  onLogin: () => void;
}
export default function Unauthorized({ onLogin }: Props) {
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    SettingsAPI.login(password)
      .then(() => {
        onLogin();
      })
      .catch(() => {
        return toast.error("Wrong password");
      });
  };
  return (
    <div className={styles.container}>
      <img
        className={styles.lockedImg}
        src="/icons/locked.svg"
        alt="Unauthorized"
      />
      <p className={styles.text}>
        This page meant to be viewed only by the portfolio owner
      </p>
      <input
        className={styles.input}
        value={password}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleLogin();
        }}
      />
      <ButtonWithIcon
        cssClass={`${styles.button} buttonHover`}
        icon="/icons/lock.svg"
        label="Unlock"
        onClick={handleLogin}
      ></ButtonWithIcon>
    </div>
  );
}
