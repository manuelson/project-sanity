"use client";

import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data } = useSession();
  const user = data?.user as User;

  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex mb-10">
      <Link className="text-xs md:text-base" href="/">
        My blog with Sanity.io{" "}
      </Link>

      {data?.user?.name ? (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {user.image && (
              <img className="w-5 h-5 rounded-full" src={user.image} />
            )}
            <span className="font-bold text-xs md:text-base">{user.name}</span>{" "}
          </div>
          <button
            className="hover:underline hover:underline-offset-4 text-xs md:text-base"
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
              className="hover:underline hover:underline-offset-4 text-xs md:text-base"
              href="/sign-in"
            >
              Sign in
            </Link>
          </li>
          <li>
            <Link
              className="hover:underline hover:underline-offset-4 text-xs md:text-base"
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
