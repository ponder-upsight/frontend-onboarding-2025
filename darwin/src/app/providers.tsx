"use client";

import { ReactNode, useState } from "react";

import theme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import {
  DehydratedState,
  HydrationBoundary,
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { showErrorToast } from "@/components/ui/Toast";

interface ProvidersProps {
  children: ReactNode;
  dehydratedState?: DehydratedState;
}

export const QueryProviders = ({ children, dehydratedState }: ProvidersProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        mutationCache: new MutationCache({
          onError: (error: unknown, vars, ctx, mutation) => {
            if (mutation.meta?.skipGlobalError) return;

            const apiError = error?.response?.data || error;
            showErrorToast(apiError);
          },
        }),
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export const ChakraLayoutProvider = ({ children }: { children: ReactNode }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
