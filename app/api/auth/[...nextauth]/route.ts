import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

type JwtUser = User & {
  username?: string;
};

type JwtSession = Session & {
  user?: {
    username?: string;
  };
};

type Jwt = JWT & {
  username?: string;
};

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: "YUT9pH1YppS4FNsa9DCdcMRMGK7G+iyI/Uzrdo+vd/8=",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        console.log("lol");
        /*const res = await fetch(apiAuthEndpoint, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });*/

        const user: JwtUser = {
          id: "1",
          name: "manu",
          email: "masda@asdsad.es",
          image: "https://ui-avatars.com/api/?name=Manu",
          username: "locotron",
        };
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/sing-up",
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async redirect({ baseUrl }: { baseUrl: string }) {
      return baseUrl;
    },
    async session({ session, token }: { session: JwtSession; token: Jwt }) {
      if (session.user) {
        session.user.username = token.username;
      }
      console.log(session);
      return session;
    },
    async jwt({ token, user }: { token: Jwt; user: JwtUser }) {
      if (user) {
        token.username = user.username;
      }
      // callback for check JWT is valid
      return token;
    },
  },
});

export { handler as GET, handler as POST };
