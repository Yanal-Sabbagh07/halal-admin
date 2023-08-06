import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
export const options: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { username, password } = credentials as any;
        // Add logic here to look up the user from the credentials supplied
        try {
          const res = await fetch("http://localhost:3000/api/login/shop", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });
          const user = await res.json();

          if (res.ok && user) {
            // Any object returned will be saved in `user` property of the JWT
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return new NextResponse(JSON.stringify("Wrong email or password"));

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (error) {
          throw new Error("Wrong Email or Password");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.storeId = user.storeId;
      }
      return token;
    },
    // IF WE WANT TO USE THE ROLE IN CLIENT COMPONENTS
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.storeId = token.storeId;
      }
      return session;
    },
  },
  pages: {
    error: "/login",
    signIn: "/login",
  },
};
