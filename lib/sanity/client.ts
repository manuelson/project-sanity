import { createClient, groq, QueryParams } from "next-sanity";
import clientConfig from "./config/client";
import { Posts } from "./types";

export const client = createClient(clientConfig);

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: QueryString;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  return client.fetch(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
  });
}

export async function getProjects(): Promise<Posts[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "post"]{
      _id,
      _createdAt, 
      title,
      author,
      "slug": slug.current,
      resume,
      "image": image.asset->url,
      body
    }`
  );
}

export async function getPost(slug: string): Promise<Posts> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      author,
      "slug": slug.current,
      "image": image.asset->url,
      publishedAt,
      body
    }`,
    { slug }
  );
}
