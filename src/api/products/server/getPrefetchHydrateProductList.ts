import { getQueryClient } from "@/lib/react-query/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import getProductList from "./getProductList";

const PAGE_SIZE = 20; // 한 페이지당 상품 수

const getPrefetchHydrateProductList = async (page: number) => {
  const queryClient = getQueryClient();
  if (page !== 1) {
    return;
  }

  // 1. 서버에서 'posts' 쿼리를 미리 가져와 캐시에 저장합니다.
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.PRODUCTS, 1],
    queryFn: () =>
      getProductList({
        page: 1,
        size: PAGE_SIZE,
      }),
  });

  // 2. 캐시의 현재 상태를 직렬화(dehydrate)합니다.
  const dehydratedState = dehydrate(queryClient);
  return dehydratedState;
};
export default getPrefetchHydrateProductList;
