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

const getGraphqlUri = () => {
    if (process.env.NODE_ENV === "production") {
        return "https://resolve-demo.vercel.app/api/graphql";
    }
    return "http://localhost:3000/api/graphql";
};

// Define the HTTP link
const httpLink = new HttpLink({
    uri: getGraphqlUri(),
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
    },
});

// Authentication link to add headers
const authLink = setContext(async (_, { headers }) => {
    try {
        const session = await getSession();
        const token = session?.user?.accessToken;

        if (!token) {
            console.warn("No access token found. Sending request without token.");
            return {
                headers: {
                    ...headers,
                    "Content-Type": "application/json",
                },
            };
        }

        return {
            headers: {
                ...headers,
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };
    } catch (error) {
        console.error("Error retrieving session:", error);
        return {
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
        };
    }
});

// Create the Apollo Client instance
const createApolloClient = () =>
    new ApolloClient({
        link: ApolloLink.from([authLink, httpLink]),
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: "network-only",
            },
            query: {
                fetchPolicy: "network-only",
                errorPolicy: "all",
            },
        },
    });

// Custom hook to initialize Apollo Client
const useApolloClient = () => {
    try {
        return useMemo(createApolloClient, []); // Memoize client creation
    } catch (error) {
        console.error("Error creating Apollo Client:", error);
        return new ApolloClient({
            cache: new InMemoryCache(),
            link: ApolloLink.empty(),
        }); // Return an empty ApolloClient to avoid undefined
    }
};

export default useApolloClient;
