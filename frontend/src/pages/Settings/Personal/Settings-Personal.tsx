import { useEffect, useRef, useState } from "react";
import EditableInput from "../../../components/ui/EditableInput/EditableInput";
import styles from "./Settings-Personal.module.css";
import { PersonalApi } from "../../../api/personalApi";
import toast from "react-hot-toast";
import type { TPersonal } from "../../../common/types/personal.type";
import { API_URL } from "../../../api/axiosClient";
import ShowPDF from "./ShowPDF/ShowPDF";
import { useLoading } from "../../../contexts/LoadingContext";

export default function SettingsPersonal() {
  const { activeLoading, stopLoading } = useLoading();
  //! =============================== Refs ===============================
  const cvRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  //! =============================== States ===============================
  const [showPDF, setShowPDF] = useState(false);
  const [personalData, setPersonalData] = useState<TPersonal>({
    id: 0,
    name: "",
    title: "",
    about: "",
    cv: "",
    image: "",
  });

  //! =============================== Handlers ===============================
  const handlePersonalFieldChange = (field: keyof TPersonal, value: string) => {
    activeLoading();
    PersonalApi.editData({ [field]: value })
      .then((res) => {
        setPersonalData((prev) => ({
          ...prev,
          [field]: res.data.data[field],
        }));
        toast.success(`${field} updated successfully`);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Something went wrong");
      })
      .finally(() => stopLoading());
  };

  // =*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=

  const handlFileApiMap = {
    image: {
      call: (file: File) => PersonalApi.editImage({ file }),
      format: (res: any) => `personal/${res.data.data.image}`,
    },
    cv: {
      call: (file: File) => PersonalApi.editCV({ file }),
      format: (res: any) => `${res.data.data.cv}`,
    },
  } as const;

  const handleFileChange = async (field: "image" | "cv", file: File) => {
    if (!file) return toast.error("Please select a file");
    const { call, format } = handlFileApiMap[field];
    activeLoading();
    try {
      const res = await call(file);
      setPersonalData((prev) => ({
        ...prev,
        [field]: format(res),
      }));
      toast.success(`${field} updated successfully`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      stopLoading();
    }
  };

  //! =============================== Effects ===============================
  useEffect(() => {
    PersonalApi.getData()
      .then((res) => {
        setPersonalData(res.data.data);
      })
      .catch((err) => {
        return toast.error(
          err.response?.data?.message || "Something went wrong"
        );
      });
  }, []);
  return (
    <div className={styles.container}>
      {showPDF && (
        <ShowPDF
          pdfUrl={`${API_URL}/personal/${personalData.cv}`}
          close={() => setShowPDF(false)}
        />
      )}

      <input
        ref={imageRef}
        style={{ display: "none" }}
        type="file"
        onChange={(e) => handleFileChange("image", e.target.files![0])}
        accept="image/*"
      />

      <input
        ref={cvRef}
        style={{ display: "none" }}
        type="file"
        onChange={(e) => handleFileChange("cv", e.target.files![0])}
        accept="application/pdf"
      />

      <EditableInput
        label="Name"
        value={personalData.name}
        onSubmit={(newValue) => handlePersonalFieldChange("name", newValue)}
        inputType="input"
        cssClass={`${styles.editableInput} ${styles.nameInput}`}
      />
      <EditableInput
        label="Job Description"
        value={personalData.title}
        onSubmit={(newValue) => handlePersonalFieldChange("title", newValue)}
        inputType="input"
        cssClass={`${styles.editableInput} ${styles.titleInput}`}
      />
      <EditableInput
        label="About Paragraph"
        value={personalData.about}
        onSubmit={(newValue) => handlePersonalFieldChange("about", newValue)}
        inputType="textArea"
        cssClass={`${styles.editableInput} ${styles.aboutInput}`}
      />

      <div className={styles.rightSideContainer}>
        <div className={styles.imgContainer}>
          <img
            className={styles.img}
            src={`${API_URL}/${personalData.image}`}
            alt="personal"
            onError={(e) => (e.currentTarget.src = "/icons/default.svg")}
          />
          <span
            className={styles.changeImg}
            onClick={() => imageRef.current?.click()}
          >
            Change
          </span>
        </div>

        <div className={styles.cvContainer}>
          <img src="/icons/cv.svg" alt="cv" />
          <span>{personalData.cv}</span>
          <button
            className={styles.view}
            onClick={() => {
              setShowPDF(true);
            }}
          >
            View
          </button>
          <button
            className={styles.change}
            onClick={() => cvRef.current?.click()}
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
}
