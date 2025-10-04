import toast from "react-hot-toast";
import { PersonalApi } from "../../../api/personalApi";
import ButtonWithIcon from "../../../components/ui/ButtonWithIcon/ButtonWithIcon";
import styles from "./HomeButtons.module.css";
import { useNavigate } from "react-router-dom";

export default function HomeButtons({
  developerName,
}: {
  developerName: string;
}) {
  const navigate = useNavigate();

  const navigateToContact = () => {
    navigate("/contact");
  };

  const downloadCV = () => {
    toast.promise(
      PersonalApi.downloadCV().then((response) => {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${developerName}_CV.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }),
      {
        loading: "Downloading CV...",
        success: "CV downloading...",
        error: "Failed to download CV",
      }
    );
  };

  return (
    <div className={styles.container}>
      <ButtonWithIcon
        icon="/icons/pdf.svg"
        label="Download CV"
        cssClass={`${styles.button} ${styles.cv} buttonHover`}
        onClick={downloadCV}
      ></ButtonWithIcon>
      <ButtonWithIcon
        icon="/icons/message.svg"
        label="Contact Me"
        cssClass={`${styles.button} ${styles.contact} buttonHover`}
        onClick={navigateToContact}
      ></ButtonWithIcon>
    </div>
  );
}
