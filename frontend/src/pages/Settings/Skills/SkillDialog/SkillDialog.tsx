import { useEffect, useRef, useState } from "react";
import { TSkill } from "../../../../common/types/skill.type";
import styles from "./SkillDialog.module.css";
import { API_URL } from "../../../../api/axiosClient";
import Checkbox from "../../../../components/ui/Checkbox/Checkbox";

interface Props {
  skillObject?: TSkill;
  handleEdit: (skill: TSkill, file?: File) => void;
  handleAdd: (skill: TSkill, file?: File) => void;
}
export default function SkillDialog({
  skillObject,
  handleEdit,
  handleAdd,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [skill, setSkill] = useState<TSkill>({
    id: skillObject ? skillObject.id : 0,
    name: skillObject ? skillObject.name : "",
    icon: skillObject ? skillObject.icon : "/icons/default_skill.svg",
    showOnPortfolio: skillObject ? skillObject.showOnPortfolio : true,
  });

  const [imgUrl, setImgUrl] = useState(skill.icon);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setImgUrl(() => previewUrl);
    setSkill((prev) => ({
      ...prev,
      icon: `${e.target?.files?.[0]?.name || prev.icon}`,
    }));
  };

  useEffect(() => {
    if (skillObject?.id) {
      setImgUrl(`${API_URL}${skillObject.icon}`);
    }
  }, [skillObject?.icon]);

  return (
    <div className={styles.container}>
      <input
        ref={fileInputRef}
        accept="image/*"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div className={styles.titleContainer}>
        <span className={styles.title}>{skillObject?.id ? "Edit" : "Add"}</span>
        <div className={styles.underline}></div>
      </div>
      <form className={styles.form}>
        <div className={styles.imgContainer}>
          <img className={styles.img} src={imgUrl} alt="Icon" />
          <span onClick={() => fileInputRef.current?.click()}>Change icon</span>
        </div>
        <div className={styles.inputContainer}>
          <input
            spellCheck="false"
            className={styles.input}
            type="text"
            placeholder="Name"
            value={skill.name}
            onChange={(e) => setSkill({ ...skill, name: e.target.value })}
          />
        </div>
        <div className={styles.inputContainer}>
          <span className={styles.label}>Show on portfolio:</span>
          <Checkbox
            currentValue={skill.showOnPortfolio || false}
            onChange={(value) => setSkill({ ...skill, showOnPortfolio: value })}
            hasBorders={true}
          />
        </div>
        <button
          className={styles.button}
          onClick={(e) => {
            e.preventDefault();
            skillObject?.id
              ? handleEdit(skill, fileInputRef.current?.files?.[0])
              : handleAdd(skill, fileInputRef.current?.files?.[0]);
          }}
        >
          Save
        </button>
      </form>
    </div>
  );
}
