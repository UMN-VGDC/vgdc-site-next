import { CommonNode, documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { Document } from "@contentful/rich-text-types/dist/types/types";
import styles from "../_components/basicPage.module.scss";
import ContentfulData from "../_components/ContentfulData";

type BlogPost = {
  title: string;
  author: string;
  date: string;
  headerImage: {
    title: string;
    description: string;
    file: any;
  };
  content: Document;
};

const richtextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_: CommonNode, children: React.ReactNode) => {
      return <p>{children}</p>;
    },
    [INLINES.HYPERLINK]: (node: CommonNode, children: React.ReactNode) => {
      return (
        <a href={node.data.uri} target="_blank">
          {children}
        </a>
      );
    },
    [BLOCKS.EMBEDDED_ASSET]: (node: CommonNode) => {
      return (
        <img
          src={`https://${node.data.target.fields.file.url}`}
          height={node.data.target.fields.file.details.image.height}
          width={node.data.target.fields.file.details.image.width}
          alt={node.data.target.fields.description}
        />
      );
    },
  },
  renderText: (text: string) => {
    return text.split("\n").reduce((children: React.ReactNode[], textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
};

export default async function Page() {
  const content = (await ContentfulData({ contentType: "blogPost" })) as BlogPost[];

  const parseDate = (ISOdate: string) => {
    const date = new Date(ISOdate);
    const parsedDate = date.toLocaleDateString();
    return parsedDate;
  };

  return (
    <main className={styles.basicPage}>
      {content.map((content, index) => (
        <article key={index}>
          <h2 className="font-header text-[2.3rem] font-bold">{content.title}</h2>
          <div className="mt-2">By {content.author}</div>
          <div className="date">{parseDate(content.date)}</div>
          <img src={content.headerImage.file.url} alt="thumbnail image" className="my-8 h-auto max-w-full" />
          {documentToReactComponents(content.content, richtextOptions)}
        </article>
      ))}
    </main>
  );
}
