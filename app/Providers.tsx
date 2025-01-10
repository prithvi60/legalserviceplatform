"use client";

import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/system";
import useApolloClient from "@/context/apolloClient";

interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <SessionProvider>
            <NextUIProvider>
                <ApolloProvider client={useApolloClient()}>{children}</ApolloProvider>
            </NextUIProvider>
        </SessionProvider>
    );
}
