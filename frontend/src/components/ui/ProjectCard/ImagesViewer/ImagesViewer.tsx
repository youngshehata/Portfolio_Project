import { useEffect, useRef, useState } from "react";
import styles from "./ImagesViewer.module.css";
import { API_URL } from "../../../../api/axiosClient";
import { onErrorImageEvent } from "../../../../common/helpers/onErrorImageEvent";
import toast from "react-hot-toast";
import ButtonWithIcon from "../../ButtonWithIcon/ButtonWithIcon";

interface Props {
  projectID: number;
  images: string[];
  github?: string;
  url?: string;
}

export default function ImagesViewer({
  projectID,
  images,
  github,
  url,
}: Props) {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [imageZoomed, setImageZoomed] = useState<boolean>(false);

  const zoomedImageRef = useRef<HTMLDivElement | null>(null);

  //! ============= Handlers & Helpers ===============
  const correctImagePath = (image: string) => {
    return `${API_URL}${image.replace("projects", `projects/${projectID}`)}`;
  };

  const handleClickNext = () => {
    const nextExists = images[currentImage + 1] !== undefined;
    if (nextExists) setCurrentImage(currentImage + 1);
    else {
      toast.error("No more images");
    }
  };

  const handleClickPrevious = () => {
    const previousExists = images[currentImage - 1] !== undefined;
    if (previousExists) setCurrentImage(currentImage - 1);
    else {
      toast.error("No previous images");
    }
  };

  const handleClickRepo = () => {
    if (!github) return toast.error("This repository is private");
    window.open(github, "_blank");
  };

  const handleClickUrl = () => {
    if (!url) return toast.error("This project is private");
    window.open(url, "_blank");
  };

  const handleClickZoom = () => {
    setImageZoomed(!imageZoomed);
  };

  //! ============= useEffects ===============

  useEffect(() => {
    if (images.length > 0) setCurrentImage(0);
  }, []);

  useEffect(() => {
    if (!imageZoomed) return; // only run when zoomed in
    const handleClickOutside = (event: MouseEvent) => {
      if (
        zoomedImageRef.current &&
        !zoomedImageRef.current.contains(event.target as Node)
      ) {
        setImageZoomed(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [imageZoomed]);

  return (
    <div className={styles.container}>
      {/* ================== Zoomed Image Element ======================= */}
      {images.length > 1 ? (
        <div
          className={
            imageZoomed
              ? styles.imageContainerZoomed
              : styles.imageContainerNotZoomed
          }
        >
          <div className={styles.overlay} ref={zoomedImageRef}>
            <img
              src={correctImagePath(images[currentImage])}
              alt="zoomedImage"
              className={styles.zoomedImage}
            />
            <img
              onClick={handleClickZoom}
              src="/icons/close.svg"
              alt="close"
              className={styles.close}
            />
          </div>
        </div>
      ) : null}

      {/* ================== Image Container ======================= */}
      {images.length >= 1 ? (
        <div className={styles.imageContainer}>
          <div onClick={handleClickZoom} className={styles.zoomElement}>
            <img src="/icons/zoom.svg" alt="zoom" />
          </div>
          {images[currentImage] && (
            <img
              className={styles.currentImg}
              src={correctImagePath(images[currentImage])}
              alt="Thumbnail"
              onError={(e) => {
                e.currentTarget.classList.add(styles["invalid_image"]);
                onErrorImageEvent(e, "/icons/invalid_image.svg");
              }}
            />
          )}
        </div>
      ) : (
        <div className={styles.noImages}>
          <span>No images</span>
        </div>
      )}

      {/* ================== SWITCHER ======================= */}
      {images.length > 1 ? (
        <div className={styles.switcher}>
          <img
            className={`${styles.arrow} ${styles.leftArrow}`}
            src="/icons/whiteLeftArrow.svg"
            alt="previous"
            onClick={handleClickPrevious}
          />
          <span className={styles.counter}>{`${currentImage + 1} of ${
            images.length
          }`}</span>
          <img
            className={`${styles.arrow} ${styles.rightArrow}`}
            src="/icons/whiteLeftArrow.svg"
            alt="next"
            onClick={handleClickNext}
          />
        </div>
      ) : (
        <div className="emptyDiv"></div>
      )}

      {/* ================== BUTTONS ======================= */}
      <div className={styles.buttonsContainer}>
        <ButtonWithIcon
          icon="/icons/link.svg"
          label="Visit"
          cssClass={`${styles.button} ${
            url ? styles.publicUrl : styles.privateUrl
          }`}
          onClick={handleClickUrl}
        ></ButtonWithIcon>
        <ButtonWithIcon
          icon="/icons/github.svg"
          label="Repo"
          cssClass={`${styles.button} ${
            github ? styles.publicRepo : styles.privateRepo
          }`}
          onClick={handleClickRepo}
        ></ButtonWithIcon>
      </div>
    </div>
  );
}
