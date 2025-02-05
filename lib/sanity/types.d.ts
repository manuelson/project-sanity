import { PortableTextBlock } from "sanity";

export type Posts = {
  title: string;
  author: string;
  slug: string;
  publishedAt: string;
  image: string;
  resume: string;
  body: PortableTextBlock[];
};
