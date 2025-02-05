"use client";

import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const { data } = useSession();
  const user = data?.user as User;

  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-10 ">
      <Link href="/">My blog with Sanity.io </Link>

      {data?.user?.name ? (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {user.image && (
              <img className="w-5 h-5 rounded-full" src={user.image} />
            )}
            <span className="font-bold">{user.name}</span>{" "}
          </div>
          <button
            className="hover:underline hover:underline-offset-4"
            onClick={() => {
              signOut();
            }}
          >
            Close session.
          </button>
        </div>
      ) : (
        <ul className="grid grid-flow-col gap-4 ">
          <li>
            <Link
              className="hover:underline hover:underline-offset-4"
              href="/sign-in"
            >
              Sign in
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline hover:underline-offset-4"
              href="/sign-up"
            >
              Login
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
