'use client'

import { QueryClientProvider } from "react-query"
import { QueryClient } from "react-query";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}