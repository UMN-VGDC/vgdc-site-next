import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "../_components/basicPage.module.scss";
import ContentfulData from "../_components/ContentfulData";

const query = `
  {
    aboutPage(id: "6gI50sekVnS2dEVzgl4001") {
      about {
        json
      }
    }
  }
`

export default async function About() {
  const data = (await ContentfulData(query, "about"))
  const about = data.aboutPage.about;

  return <main className={styles.basicPage}>{documentToReactComponents(about.json)}</main>;
}
