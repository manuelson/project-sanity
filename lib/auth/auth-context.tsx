"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

type AuthContextProps = {
  children: React.ReactNode;
  session?: Session;
};

export default function AuthProvider({
  children,
  ...props
}: AuthContextProps): React.JSX.Element {
  return (
    <SessionProvider
      refetchInterval={5 * 60} // re-fetch session every 5 minutes
      refetchOnWindowFocus // re-fetches session when window is focused
      session={props.session}
    >
      {children}
    </SessionProvider>
  );
}
