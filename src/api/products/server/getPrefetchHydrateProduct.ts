import { getQueryClient } from "@/lib/react-query/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import getProduct from "./getProduct";

const getPrefetchHydrateProduct = async (productId: string) => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.PRODUCT, productId],
    queryFn: () => getProduct({ productId }),
  });

  const dehydratedState = dehydrate(queryClient);
  return dehydratedState;
};

export default getPrefetchHydrateProduct;
