import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { createClient, EntrySkeletonType, FieldsType } from "contentful";
import React from "react";

type ContentType = "blogPost" | "aboutPage" | "faqPage";

export default async function ContentfulData({ contentType }: { contentType: ContentType }) {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    environment: "master", // defaults to 'master' if not set
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  });

  function parseBlogPosts(entries: FieldsType) {
    const sanitizedEntries = entries.items.map((e: any) => {
      const headerImage = e.fields.headerImage.fields;
      return { ...e.fields, headerImage };
    });
    return sanitizedEntries;
  }

  function parseTextPage(entries: FieldsType) {
    const items = entries.items[0].fields;
    return { ...items[Object.keys(items)[0]] };
  }

  const getContent = async (contentType: ContentType) => {
    try {
      const entries = await client.getEntries<EntrySkeletonType>({
        content_type: contentType,
      });
      switch (contentType) {
        case "blogPost":
          return parseBlogPosts(entries);
        case "aboutPage":
          return parseTextPage(entries);
        case "faqPage":
          return parseTextPage(entries);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const content = await getContent(contentType);

  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (_: any, children: React.ReactNode) => <h1 className="font-header font-bold">{children}</h1>,
      [BLOCKS.HEADING_2]: (_: any, children: React.ReactNode) => (
        <h2 className="font-header text-xl font-bold">{children}</h2>
      ),
    },
  };

  if (contentType === 'blogPost') return content;
  return <>{documentToReactComponents(content, options)}</>;
}
