import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

// 서버와 클라이언트에서 QueryClient 인스턴스를 안전하게 공유하기 위한 싱글턴 패턴
export const getQueryClient = cache(() => new QueryClient());
