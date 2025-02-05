import Link from "next/link";
import { sanityFetch } from "../lib/sanity/client";
import { Posts } from "../lib/sanity/types";
import Image from "next/image";
import { groq } from "next-sanity";

export default async function Home() {
  const posts = await sanityFetch({
    query: groq`*[_type == "post"]{
      _id,
      _createdAt, 
      title,
      author,
      "slug": slug.current,
      resume,
      "image": image.asset->url,
      body
    }`,
    tags: ["post"],
  });

  console.log(posts);
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-10">
        <Link href="/">My blog with Sanity.io</Link>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left relative">
        {posts.map((project: Posts, idx: number) => (
          <>
            <Link
              key={idx}
              href={`post/${project.slug}`}
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            >
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  width={750}
                  height={300}
                  className="object-cover rounded-lg "
                />
              )}
              <h2 className={`mb-3 font-semibold pt-2`}>{project.title}</h2>
              <p className={`m-0 text-sm opacity-50`}>{project.resume}</p>
            </Link>
          </>
        ))}
      </div>
    </main>
  );
}
