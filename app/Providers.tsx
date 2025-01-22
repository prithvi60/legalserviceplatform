"use client";

import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { HeroUIProvider } from "@heroui/system";
import useApolloClient from "@/context/apolloClient";

interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <SessionProvider>
            <HeroUIProvider>
                <ApolloProvider client={useApolloClient()}>{children}</ApolloProvider>
            </HeroUIProvider>
        </SessionProvider>
    );
}
