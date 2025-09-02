"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import getProductList from "./getProductList";
import { ProductListItem } from "@/types/products";
import { AxiosError } from "axios";

const PAGE_SIZE = 20; // 기본 페이지 크기

// API 응답의 타입을 명확히 합니다.
interface GetProductListResponse {
  pageResult: ProductListItem[];
}

const useGetProductListInfinite = () =>
  useInfiniteQuery<
    GetProductListResponse, // TQueryFnData: API 함수의 반환 타입
    AxiosError, // TError: 에러 타입
    ProductListItem[] // TData: select 함수를 거친 최종 데이터 타입
  >({
    queryKey: [QueryKeys.PRODUCTS, "infinite", PAGE_SIZE],

    initialPageParam: 0,

    queryFn: ({ pageParam = 0 }) =>
      getProductList({ page: pageParam as number, size: PAGE_SIZE }),

    getNextPageParam: (lastPage: GetProductListResponse, allPages) => {
      if (lastPage.pageResult && lastPage.pageResult.length === PAGE_SIZE) {
        return allPages.length; // 다음 페이지 번호 반환
      }
      return undefined;
    },

    staleTime: 1000 * 60 * 5,
    select: (data) => data.pages.flatMap((page) => page.pageResult),
  });

export default useGetProductListInfinite;
