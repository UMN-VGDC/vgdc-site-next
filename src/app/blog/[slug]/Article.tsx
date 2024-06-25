import { CommonNode, documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import Image from "next/image";
import Link from "next/link";
import styles from "../../_components/basicPage.module.scss";
import { BlogPost } from "../ArticlePanels";
import ArticleContainer from "./ArticleContainer";

interface Article {
  content: BlogPost;
}

export default async function Article({ content }: Article) {
  const parseDate = (ISOdate: string) => {
    const date = new Date(ISOdate);
    const parsedDate = date.toLocaleDateString();
    return parsedDate;
  };

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  const richtextOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_: CommonNode, children: React.ReactNode) => {
        return <p className="mt-4">{children}</p>;
      },
      [INLINES.HYPERLINK]: (node: CommonNode, children: React.ReactNode) => {
        const id = getYoutubeId(node.data.uri);

        if (id) {
          return <iframe src={`//www.youtube.com/embed/${id}`} allowFullScreen className="my-8 aspect-video w-full" />;
        } else {
          return (
            <Link href={node.data.uri} target="_blank" className="font-semibold text-blue-700">
              {children}
            </Link>
          );
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: CommonNode) => {
        //finds the id in the rich text and match it with the asset with the matching id
        const { block } = content.content.links.assets;
        const { id } = node.data.target.sys;

        const imageData = block.find((e: any) => e.sys.id === id);
        //image url
        //https://images.ctfassets.net/{space_id}/{asset_id}/{unique_id}/{name}?fm={image_format}
        return (
          <div className="flex w-full justify-center">
            <Image
              className="rounded-sm"
              src={imageData.url + "?fm=webp"}
              alt={imageData.description}
              width={imageData.width}
              height={imageData.height}
            />
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
    <ArticleContainer>
      <Image
        src={content.headerImage.url + "?fm=webp"}
        width={content.headerImage.width}
        height={content.headerImage.height}
        alt="thumbnail image"
        className="my-8 h-auto max-w-full rounded-sm"
      />
      <h1 className="font-header text-[2.3rem] font-bold">{content.title}</h1>
      <div>
        By {content.author}&nbsp; • &nbsp;{parseDate(content.date)}
      </div>
      {documentToReactComponents(content.content.json, richtextOptions)}
    </ArticleContainer>
  );
}
