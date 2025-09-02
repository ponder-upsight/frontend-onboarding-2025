"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import getProductList from "./getProductList";
import { ProductListItem } from "@/types/products";
import { AxiosError } from "axios";

const PAGE_SIZE = 20;

interface GetProductListResponse {
  pageResult: ProductListItem[];
}

interface UseGetProductListInfiniteRequest {
  size?: number;
}

const useGetProductListInfinite = ({
  size = PAGE_SIZE,
}: UseGetProductListInfiniteRequest = {}) =>
  useInfiniteQuery<
    GetProductListResponse,
    AxiosError,
    ProductListItem[],
    [string, string, number],
    number
  >({
    queryKey: [QueryKeys.PRODUCTS, "infinite", size],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) =>
      getProductList({ page: pageParam as number, size }),

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || !lastPage.pageResult) {
        return undefined;
      }

      if (lastPage.pageResult.length === size) {
        return allPages.length;
      }

      return undefined;
    },
    staleTime: 1000 * 60 * 5,
    select: (data) => data.pages.flatMap((page) => page.pageResult),
  });

export default useGetProductListInfinite;
