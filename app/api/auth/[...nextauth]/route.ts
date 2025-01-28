import NextAuth, { Session, User } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/db";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
// Extend the interface
declare module "next-auth" {
  interface Session {
    user: {
      name?: string;
      email?: string;
      accessToken?: string;
      id?: string;
    };
    accessToken?: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}

const JWT_SECRET = process.env.NEXTAUTH_SECRET;

if (!JWT_SECRET) {
  throw new Error("NEXTAUTH_SECRET is not defined in environment variables");
}

const generateToken = (user: { id: number; email: string }) => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1d",
  });
};

const authenticateUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  const user = await prisma.users.findUnique({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    return {
      id: user.id.toString(),
      name: user.username,
      email: user.email,
      accessToken: generateToken({
        id: user.id,
        email: user.email,
      }),
    };
  }
  return null;
};

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          console.error("Authorization failed: Missing email or password");
          throw new Error("Email and password are required");
        }

        const user = await authenticateUser(
          credentials.email,
          credentials.password
        );

        if (!user) {
          console.error(
            "Authorization failed: Invalid email or password for",
            credentials.email
          );
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },
  callbacks: {
    async jwt({ token, user }: { user?: User; token: JWT }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken;
      session.user.accessToken = token.accessToken;
      // session.user.id = user?.id;
      return session;
    },
  },
  secret: JWT_SECRET,
});

export { handler as GET, handler as POST };
