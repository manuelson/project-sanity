import Link from "next/link";
import { sanityFetch } from "@/app/lib/sanity/client";
import Image from "next/image";
import { groq, PortableText } from "next-sanity";

type Params = Promise<{ slug: string }>;

export default async function Post(props: { params: Params }) {
  const { slug } = await props.params;
  const project = await sanityFetch({
    query: groq`*[_type == "post" && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      author,
      "slug": slug.current,
      "image": image.asset->url,
      publishedAt,
      body
    }`,
    params: { slug },
    tags: ["post"],
  });

  // transform publishedAt to a readable format
  const date = new Date(project.publishedAt);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-10">
        <Link href="/">My blog with Sanity.io</Link>
      </div>

      <div className="mb-32 lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left">
        <div className="z-10 max-w-5xl w-full font-bold items-center bold justify-between font-mono text-sm lg:flex mb-10">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
            <Link href="/">Go back</Link>
          </button>
        </div>
        <div className="mb-32 grid lg:gap-8 sm:gap-3 lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left ">
          <div>
            {project.image && (
              <Image
                src={project.image}
                alt={project.title}
                width={750}
                height={300}
                className="rounded-lg"
              />
            )}
            <div className="mt-2">
              <span className="bg-blue-100 mt-2 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">
                Writed by <strong>{project.author}</strong>
              </span>
              <span className="mt-2 text-xs">
                Published at: <strong>{date.toDateString()}</strong>
              </span>
            </div>
          </div>

          <div>
            <h1 className={`mb-3 font-semibold text-3xl`}>{project.title}</h1>
            <PortableText value={project.body} />
          </div>
        </div>
      </div>
    </main>
  );
}
