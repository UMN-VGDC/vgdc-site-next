import ContentfulData from "../_components/ContentfulData";
import styles from "../_components/basicPage.module.scss";

export default async function About() {
  return (
    <main className={styles.basicPage}>
      <ContentfulData contentType="faqPage" />
    </main>
  );
}
