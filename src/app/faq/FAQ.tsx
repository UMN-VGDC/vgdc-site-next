import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "../_components/basicPage.module.scss";
import ContentfulData from "../_components/ContentfulData";

const query = `
  {
    faqPage(id: "urzWD7JIxtk2HqLJyQP3B") {
      faq {
        json
      }
    }
  }
`;

export default async function FAQ() {
  const data = await ContentfulData(query, "faq");
  const faq = data.faqPage.faq;

  return <main className={styles.basicPage}>{documentToReactComponents(faq.json)}</main>;
}
