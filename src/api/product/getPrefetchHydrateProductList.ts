import { getQueryClient } from "@/lib/react-query/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import { QueryKeys } from "./QueryKeys";
import getProductList from "./getProductList";

const getPrefetchHydrateProductList = async () => {
  const queryClient = getQueryClient();

  // 1. 서버에서 'posts' 쿼리를 미리 가져와 캐시에 저장합니다.
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.PRODUCTS, 1],
    queryFn: () => getProductList(1, 9),
  });

  // 2. 캐시의 현재 상태를 직렬화(dehydrate)합니다.
  const dehydratedState = dehydrate(queryClient);
  return dehydratedState;
};
export default getPrefetchHydrateProductList;
