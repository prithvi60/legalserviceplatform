"use client";

import client from '@/context/apolloClient';
import { ApolloProvider } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';


interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <SessionProvider>
            <ApolloProvider client={client}>
                {children}
            </ApolloProvider>
        </SessionProvider>
    );
}

