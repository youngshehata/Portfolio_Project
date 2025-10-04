import styles from "./ShowPDF.module.css";

interface Props {
  pdfUrl: string;
  close: () => void;
}

export default function ShowPDF({ pdfUrl, close }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.pdfContainer}>
        <iframe className={styles.pdf} src={pdfUrl}></iframe>
      </div>
      <img
        className={styles.close}
        src="/icons/close.svg"
        alt="close"
        onClick={close}
      />
    </div>
  );
}
