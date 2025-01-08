"use client";
import {
    ApolloClient,
    InMemoryCache,
    ApolloLink,
} from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";
// import { getSession } from "next-auth/react";

// const getGraphqlUri = () =>
//   process.env.NODE_ENV === "production"
//     ? "https://ensileta-portal.vercel.app/api/graphql"
//     : "http://localhost:3000/api/graphql";


// const authLink = setContext(async (_, { headers }) => {
//   try {
//     const session = await getSession();
//     const token = session?.accessToken;

//     if (!token) {
//       console.warn("No access token found. Sending request without token.");
//       return { headers };
//     }

//     return {
//       headers: {
//         ...headers,
//         authorization: `Bearer ${token}`,
//       },
//     };
//   } catch (error) {
//     console.error("Error retrieving session:", error);
//     return { headers };
//   }
// });

const client = new ApolloClient({
    link: ApolloLink.from([]),
    cache: new InMemoryCache(),
    credentials: "same-origin",
});

export default client;
