import { CommonNode, documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import Image from "next/image";
import Link from "next/link";
import styles from "../_components/basicPage.module.scss";
import { BlogPost } from "./page";

interface Article {
  content: BlogPost;
}

export default function Article({ content }: Article) {
  const parseDate = (ISOdate: string) => {
    const date = new Date(ISOdate);
    const parsedDate = date.toLocaleDateString();
    return parsedDate;
  };

  const richtextOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_: CommonNode, children: React.ReactNode) => {
        return <p className="mt-4">{children}</p>;
      },
      [INLINES.HYPERLINK]: (node: CommonNode, children: React.ReactNode) => {
        return (
          <Link href={node.data.uri} target="_blank" className="font-semibold text-blue-700">
            {children}
          </Link>
        );
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: CommonNode) => {
        //finds the id in the rich text and match it with the asset with the matching id
        const { block } = content.content.links.assets;
        const { id } = node.data.target.sys;

        const imageData = block.find((e: any) => e.sys.id === id);
        return (
          <div className="flex w-full justify-center">
            <Image src={imageData.url} alt={imageData.description} width={imageData.width} height={imageData.height} />
          </div>
        );
      },
    },
    renderText: (text: string) => {
      return text.split("\n").reduce((children: React.ReactNode[], textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      }, []);
    },
  };

  return (
    <article className={styles.basicPage}>
      <h1 className="font-header text-[2.3rem] font-bold">{content.title}</h1>
      <div className="mt-2">By {content.author}</div>
      <div className="date">{parseDate(content.date)}</div>
      <img src={content.headerImage.url} alt="thumbnail image" className="my-8 h-auto max-w-full" />
      {documentToReactComponents(content.content.json, richtextOptions)}
    </article>
  );
}
