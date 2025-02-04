import { PortableTextBlock } from "sanity";

export type Posts = {
  title: string;
  slug: string;
  publishedAt: string;
  image: string;
  resume: string;
  body: PortableTextBlock[];
};
