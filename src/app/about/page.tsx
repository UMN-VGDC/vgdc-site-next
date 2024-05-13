import ContentfulData from "../_components/ContentfulData";
import styles from "../basicPage.module.scss";

export default async function About() {
  return (
    <main className={styles.basicPage}>
      <ContentfulData contentType="aboutPage" />
    </main>
  );
}
