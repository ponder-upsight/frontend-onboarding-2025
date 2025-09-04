"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { customToast } from "../zustand/useCustomToastStore";
import { AxiosError } from "axios";

type AxiosErrorResponse = {
  code: string;
  message: string;
};

interface QueryProviderProps {
  children: React.ReactNode;
}

const QueryProvider = ({ children }: QueryProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 리페치 비활성화
            retry: 1, // 실패 시 1번 재시도
          },
          mutations: {
            onError: (error) => {
              const errorObj = error as AxiosError;
              const { response } = errorObj;
              const { data } = response || {};
              const { message, code } = data as AxiosErrorResponse;
              customToast({
                status: "error",
                message:
                  `${message} : ${code}` || "요청 처리 중 문제가 발생했습니다.",
                duration: 3000,
              });
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default QueryProvider;
