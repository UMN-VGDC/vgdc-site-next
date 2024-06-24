//Contentful GraphQL documentation:
//https://www.contentful.com/developers/docs/references/graphql/#/introduction

//GraphiQL IDE for inspecting the schema:
//https://graphql.contentful.com/content/v1/spaces/{SPACE_ID}/explore?access_token={ACCESS_TOKEN}

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
