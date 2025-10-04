import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";
import NavbarToggler from "./NavbarToggler/NavbarToggler";
import { navbarItems } from "./navbar-items";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../../custom/ThemeToggle/ThemeToggle";
export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement>(null);
  const handleToggle = () => setIsExpanded(!isExpanded);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={navRef}
      className={`${styles.container} ${isExpanded ? styles.expanded : ""}`}
    >
      <NavbarToggler handleToggle={handleToggle} isExpanded={isExpanded} />
      <ul className={`${styles.list} ${isExpanded ? styles.listExpanded : ""}`}>
        {navbarItems.map((item) => (
          <li
            key={item.name}
            onClick={() => {
              if (isExpanded) {
                handleToggle();
              }
            }}
          >
            <Link to={`${item.url}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <ThemeToggle expanded={isExpanded} />
    </div>
  );
}
