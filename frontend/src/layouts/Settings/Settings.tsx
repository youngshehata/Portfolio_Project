import { useEffect, useState } from "react";
import styles from "./Settings.module.css";
import { SettingsAPI } from "../../api/settingsApi";
import Unauthorized from "../../pages/Settings/Unauthorized/Unauthorized";
import { NavLink, Outlet } from "react-router-dom";
import { settingsList } from "./settings-list";
import toast from "react-hot-toast";

export default function Settings() {
  const [authenticated, setAuthenticated] = useState(false);

  const onLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    SettingsAPI.logout()
      .then(() => {
        setAuthenticated(false);
        window.location.href = "/";
      })
      .catch(() => {
        return toast.error("Something went wrong");
      });
  };
  //! Making sure user is authenticated
  useEffect(() => {
    SettingsAPI.isLogged()
      .then(() => {
        setAuthenticated(true);
      })
      .catch(() => {
        setAuthenticated(false);
      });
  }, []);

  if (!authenticated) {
    return <Unauthorized onLogin={onLogin} />;
  }
  return (
    <div className={styles.container}>
      {/* Left navbar */}
      <aside className={styles.sidebar}>
        <nav>
          <ul>
            {settingsList.map((item) => (
              <li
                key={item.name}
                className={item.cssClass ? styles[item.cssClass] : ""}
              >
                <NavLink
                  to={item.url}
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li className={styles.logout} onClick={handleLogout}>
              Logout
            </li>
          </ul>
        </nav>
      </aside>

      {/* Right content */}
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
