import styles from "./loader.module.scss"

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>Loading...</div>
    </div>
  );
}
