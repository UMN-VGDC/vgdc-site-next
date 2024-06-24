import ContentfulData from "../_components/ContentfulData";
import Article from "./Article";

export type BlogPost = {
  title: string;
  author: string;
  date: string;
  content: any;
  headerImage: {
    url: string;
    description: string;
  };
};

const blogPostQuery = `
{
  blogPostCollection {
    items {
      title
      author
      date
      headerImage {
        description
        url
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
}
`

export default async function Page() {
  const data = (await ContentfulData(blogPostQuery, "blog post"));
  const items = data.blogPostCollection.items as BlogPost[]
  return (
    <main>
      {items.map((content, index) => (
        <Article content={content} key={index} />
      ))}
    </main>
  );
}


