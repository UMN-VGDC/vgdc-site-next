import ContentfulData from "@/app/_components/ContentfulData";
import { Metadata } from "next";
import { BlogPost } from "../ArticlePanels";
import Article from "./Article";

type Props = {
  params: { slug: string };
};

const query = (id: string) => {
  return `
{
  blogPost(id: "${id}")
  {
      title
      author
      date
      headerImage {
        description
        url
        width
        height
      }
      content {
        json
        links {
          assets {
						block {
              sys {
                id
              }
              title
              description
              fileName
              url
              width
              height
            }
          }
        }
      }
  }
}
`;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await ContentfulData(query(params.slug), "blog post");
  const content = data.blogPost as BlogPost;

  return {
    title: content.title,
    authors: [{ name: content.author }],
    openGraph: {
      images: [content.headerImage.url  + "?fm=webp"],
    },
    twitter: {
      images: [content.headerImage.url  + "?fm=webp"],
    },
  };
}

export default async function Page({ params }: Props) {
  const data = await ContentfulData(query(params.slug), "blog post");
  const content = data.blogPost as BlogPost;
  return <Article content={content} />;
}
