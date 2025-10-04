import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";
export function ThemeToggle({ expanded }: { expanded: boolean }) {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div
      className={`${styles.toggle} ${expanded ? styles.expanded : ""}`}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <img
        src={theme === "light" ? "/icons/moon.svg" : "/icons/sun.svg"}
        alt="theme"
      />
    </div>
  );
}
