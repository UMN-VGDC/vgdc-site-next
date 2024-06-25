import Image from "next/image";
import Link from "next/link";
import ContentfulData from "../_components/ContentfulData";

export type BlogPost = {
  sys: {
    id: string;
  };
  title: string;
  author: string;
  date: string;
  content: any;
  headerImage: {
    url: string;
    description: string;
    width: number;
    height: number;
  };
};

const query = `
  {
    blogPostCollection {
      items {
        sys {
          id
        }
        title
        author
        date
        headerImage {
          description
          url
        }
      }
    }
  }
`;

export default async function ArticlePanels() {
  const data = await ContentfulData(query, "blog post");
  const items = data.blogPostCollection.items as BlogPost[];

  return items.map((content, index) => {
    return <Panel key={index} content={content} />;
  });
}

function Panel({ content }: { content: BlogPost }) {
  const parseDate = (ISOdate: string) => {
    const date = new Date(ISOdate);
    const parsedDate = date.toLocaleDateString();
    return parsedDate;
  };

  return (
    <Link href={`/blog/${content.sys.id}`} className="rounded-md bg-[#e4e4e4] p-4 text-[#3b3b3b]">
      <div className="relative h-[14rem] w-full">
        <Image
          fill
          src={content.headerImage.url + "?fm=webp"}
          alt="thumbnail image"
          className="mb-4 h-auto max-w-full rounded-md"
          style={{ objectFit: "cover" }}
        />
      </div>
      <h2 className="mt-4 inline-block w-full overflow-hidden text-ellipsis whitespace-nowrap font-header text-[1.7rem] font-bold leading-9">
        {content.title}
      </h2>
      <div className="mt-2">
        By {content.author}&nbsp; • &nbsp;{parseDate(content.date)}
      </div>
    </Link>
  );
}
