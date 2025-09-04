import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

// 서버와 클라이언트에서 QueryClient 인스턴스를 안전하게 공유하기 위한 싱글턴 패턴
export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 리페치 비활성화
          retry: 1, // 실패 시 1번 재시도
        },
      },
    })
);
