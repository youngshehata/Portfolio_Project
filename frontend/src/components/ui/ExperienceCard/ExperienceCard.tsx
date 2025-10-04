import styles from "./ExperienceCard.module.css";

interface Props {
  id: number;
  challenge: string;
  solution: string;
}
export default function ExperienceCard({ challenge, solution }: Props) {
  return (
    <div className={styles.container}>
      <span>Challenge:</span>
      <p className={styles.challenge}>{challenge}</p>
      <span>Solution:</span>
      <p className={styles.solution}>{solution}</p>
    </div>
  );
}
