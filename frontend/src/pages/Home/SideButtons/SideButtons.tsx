import { useNavigate } from "react-router-dom";
import styles from "./SideButtons.module.css";

export default function SideButtons() {
  const navigate = useNavigate();
  const navigateToPortfolioRepo = () => {
    window.open("https://github/youngshehata/portfolio", "_blank");
  };
  const navigateToProjects = () => {
    navigate("/projects");
  };
  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} buttonHover`}
        onClick={navigateToProjects}
      >
        Checkout My Projects
      </button>
      <button
        className={`${styles.button} ${styles.secondButton} buttonHover`}
        onClick={navigateToPortfolioRepo}
      >
        Clone My Portfolio
      </button>
    </div>
  );
}
