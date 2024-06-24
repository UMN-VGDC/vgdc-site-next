import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ContentfulData from "../_components/ContentfulData";
import styles from "../_components/basicPage.module.scss";

const query = `
  {
    faqPage(id: "urzWD7JIxtk2HqLJyQP3B") {
      faq {
        json
      }
    }
  }
`

export default async function About() {
  const data = (await ContentfulData(query, "faq"))
  const faq = data.faqPage.faq;
  
  return (
    <main className={styles.basicPage}>
      {documentToReactComponents(faq.json)}
    </main>
  );
}
