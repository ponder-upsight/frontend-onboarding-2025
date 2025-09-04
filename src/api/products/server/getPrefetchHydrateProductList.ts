import { getQueryClient } from "@/shared/lib/react-query/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import getProductList from "./getProductList";

const PAGE_SIZE = 20;

const getPrefetchHydrateProductList = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [QueryKeys.PRODUCTS, "infinite", PAGE_SIZE],
    queryFn: ({ pageParam = 0 }) =>
      getProductList({
        page: pageParam,
        size: PAGE_SIZE,
      }),
    initialPageParam: 0,
  });

  const dehydratedState = dehydrate(queryClient);
  return dehydratedState;
};

export default getPrefetchHydrateProductList;
