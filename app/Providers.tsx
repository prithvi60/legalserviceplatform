"use client";

import client from "@/context/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/system";

interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <SessionProvider>
            <NextUIProvider>
                <ApolloProvider client={client}>{children}</ApolloProvider>
            </NextUIProvider>
        </SessionProvider>
    );
}
