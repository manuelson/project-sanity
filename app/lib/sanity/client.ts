import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client";
import { Posts } from "./types";

export async function getProjects(): Promise<Posts[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "post"]{
      _id,
      _createdAt, 
      title,
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
      "slug": slug.current,
      "image": image.asset->url,
      publishedAt,
      body
    }`,
    { slug }
  );
}
