import type { TSkill } from "../../../common/types/skill.type";
import ImagesViewer from "./ImagesViewer/ImagesViewer";
import styles from "./ProjectCard.module.css";
import Technologies from "./Technologies/Technologies";

interface Props {
  id: number;
  name: string;
  overview?: string;
  url?: string;
  github?: string;
  images?: string[];
  skills?: TSkill[];
}
export default function ProjectCard({
  id,
  name,
  overview,
  url,
  github,
  images,
  skills,
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.titleAndOverview}>
        <span className={styles.title}>{name}</span>
        <p className={`${styles.overview} scroll`}>{overview}</p>
      </div>
      <Technologies list={skills || []} />
      <ImagesViewer
        projectID={id}
        images={images || []}
        github={github}
        url={url}
      />
    </div>
  );
}
