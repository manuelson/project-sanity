import Link from "next/link";

export default function Header() {
  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-10 ">
      <Link href="/">My blog with Sanity.io</Link>
    </div>
  );
}
