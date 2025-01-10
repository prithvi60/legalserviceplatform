"use client";
import {
    ApolloClient,
    InMemoryCache,
    ApolloLink,
    HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";
import { useMemo } from "react";

const getGraphqlUri = () =>
    process.env.NODE_ENV === "production"
        ? "https://legalserviceplatform.vercel.app/api/graphql"
        : "http://localhost:3000/api/graphql";

const httpLink = new HttpLink({
    uri: getGraphqlUri(),
});

const authLink = setContext(async (_, { headers }) => {
    try {
        const session = await getSession();
        const token = session?.accessToken;

        if (!token) {
            console.warn("No access token found. Sending request without token.");
            return { headers };
        }

        return {
            headers: {
                ...headers,
                authorization: `Bearer ${token}`,
            },
        };
    } catch (error) {
        console.error("Error retrieving session:", error);
        return { headers };
    }
});

const createApolloClient = () =>
    new ApolloClient({
        link: ApolloLink.from([authLink, httpLink]),
        cache: new InMemoryCache(),
        credentials: "same-origin",
    });

const useApolloClient = () => useMemo(createApolloClient, []);

export default useApolloClient;
