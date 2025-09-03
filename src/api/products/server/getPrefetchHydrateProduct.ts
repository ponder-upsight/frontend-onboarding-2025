import { getQueryClient } from "@/lib/react-query/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import getProduct from "./getProduct";

const getPrefetchHydrateProduct = async (productId: string) => {
  const queryClient = getQueryClient();

  // 먼저 캐시에 데이터가 있는지 확인
  const existingData = queryClient.getQueryData([QueryKeys.PRODUCT, productId]);

  console.log("existingData", productId, existingData);

  // 캐시에 데이터가 없을 때만 prefetch
  if (!existingData) {
    await queryClient.prefetchQuery({
      queryKey: [QueryKeys.PRODUCT, productId],
      queryFn: () => getProduct({ productId }),
    });
  }

  const dehydratedState = dehydrate(queryClient);
  return dehydratedState;
};

export default getPrefetchHydrateProduct;
