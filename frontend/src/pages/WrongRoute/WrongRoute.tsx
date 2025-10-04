import styles from "./WrongRoute.module.css";
export default function WrongRoute() {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src="/icons/wrong_route.svg"
        alt="Invalid Route"
      />
      <p className={styles.text}>The page you are looking for does not exist</p>
    </div>
  );
}
