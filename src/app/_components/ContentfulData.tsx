export default async function ContentfulData(query: string, tags: string) {
  const data = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID!}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN!}`
    },
    body: JSON.stringify({query}),
    next: { tags: [tags] }
  })
  const res = await data.json();  
  return res.data;
}
