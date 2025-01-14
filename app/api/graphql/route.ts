import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { typeDefs } from "@/constants/TypeDefs";
import { resolvers } from "@/constants/Resolvers";
import { getUserFromToken } from "@/constants/GetUserInfo";

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Context for Apollo Server
const createContext = async (req: NextRequest) => {
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

// Create base handler with explicit typing
const baseHandler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: createContext,
});

// CORS middleware with corrected typing
async function corsMiddleware(
  req: NextRequest,
  handlerFn: typeof baseHandler
): Promise<NextResponse> {
  const origin = req.headers.get("origin") || "";
  const allowedOrigins = [
    "https://legalserviceplatform.vercel.app",
    "http://localhost:3000",
  ];

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    const headers = {
      "Access-Control-Allow-Origin": allowedOrigins.includes(origin)
        ? origin
        : "",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
      "Access-Control-Allow-Credentials": "true",
    };
    return new NextResponse(null, { headers });
  }

  // Handle actual request
  try {
    const response = await handlerFn(req);
    const newHeaders = new Headers(response.headers);

    if (allowedOrigins.includes(origin)) {
      newHeaders.set("Access-Control-Allow-Origin", origin);
    }
    newHeaders.set("Access-Control-Allow-Credentials", "true");
    newHeaders.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    newHeaders.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    return new NextResponse(response.body, {
      status: response.status,
      headers: newHeaders,
    });
  } catch (error) {
    console.error("Request error:", error);
    const errorHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (allowedOrigins.includes(origin)) {
      errorHeaders["Access-Control-Allow-Origin"] = origin;
      errorHeaders["Access-Control-Allow-Credentials"] = "true";
    }
    return new NextResponse(
      JSON.stringify({ errors: [{ message: "Internal server error" }] }),
      { status: 500, headers: errorHeaders }
    );
  }
}

// Route handlers with corrected implementation
export async function POST(req: NextRequest): Promise<NextResponse> {
  return corsMiddleware(req, baseHandler);
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  return corsMiddleware(req, baseHandler);
}

export async function OPTIONS(req: NextRequest): Promise<NextResponse> {
  return corsMiddleware(req, baseHandler);
}
