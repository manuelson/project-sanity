import Link from "next/link";
import { getPost } from "@/app/lib/sanity/client";
import Image from "next/image";
import { PortableText } from "next-sanity";

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const project = await getPost(params.slug);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-10">
        <Link href="/">My blog with Sanity.io</Link>
      </div>

      <div className="mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:text-left">
        <div className="z-10 max-w-5xl w-full font-bold items-center bold justify-between font-mono text-sm lg:flex mb-10">
          <Link href="/">Go back</Link>
        </div>
        <div className="flex gap-5 justify-items-center group rounded-lg border border-transparent px-5 py-4">
          {project.image && (
            <Image
              src={project.image}
              alt={project.title}
              width={750}
              height={300}
              className="object-cover rounded-lg w-96 object-contain"
            />
          )}
          <div>
            <h1 className={`mb-3 font-semibold pt-2 text-3xl`}>
              {project.title}
            </h1>
            <PortableText value={project.body} />
          </div>
        </div>
      </div>
    </main>
  );
}
