import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { typeDefs } from "@/constants/TypeDefs";
import { resolvers } from "@/constants/Resolvers";
import { getUserFromToken } from "@/constants/GetUserInfo";

const allowedOrigins = [
  "https://legalserviceplatform.vercel.app",
  "http://localhost:3000",
];

const context = async (req: NextRequest) => {
  try {
    const token = req.headers.get("authorization") || "";
    const user = getUserFromToken(token);
    return {
      userId: user?.id || null,
      prisma,
    };
  } catch (error) {
    console.error("Error creating context:", error);
    return { userId: null, prisma };
  }
};

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create Next.js handler for Apollo Server with CORS headers
const baseHandler = startServerAndCreateNextHandler<NextRequest>(server, {
  context,
});

// Middleware to add CORS headers
async function handler(req: NextRequest) {
  const origin = req.headers.get("origin") || "";

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    // Properly typed headers object
    const headers: Record<string, string> = {
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    };

    // Conditionally add CORS origin
    if (allowedOrigins.includes(origin)) {
      headers["Access-Control-Allow-Origin"] = origin;
    }

    return new NextResponse(null, { headers });
  }

  // Handle actual requests
  try {
    const response = await baseHandler(req);
    const newResponse = new NextResponse(response.body, response);

    if (allowedOrigins.includes(origin)) {
      newResponse.headers.set("Access-Control-Allow-Origin", origin);
    }
    newResponse.headers.set("Access-Control-Allow-Credentials", "true");
    newResponse.headers.set(
      "Access-Control-Allow-Methods",
      "POST, GET, OPTIONS"
    );
    newResponse.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    return newResponse;
  } catch (error) {
    console.error("GraphQL request error:", error);

    // Define headers for error response
    const errorHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (allowedOrigins.includes(origin)) {
      errorHeaders["Access-Control-Allow-Origin"] = origin;
    }

    return new NextResponse(
      JSON.stringify({
        errors: [{ message: "Internal server error" }],
      }),
      {
        status: 500,
        headers: errorHeaders,
      }
    );
  }
}

export const GET = handler;
export const POST = handler;
export const OPTIONS = handler;
