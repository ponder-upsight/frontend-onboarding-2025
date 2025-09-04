import { getQueryClient } from "@/shared/lib/react-query/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import getProduct from "./getProduct";

type GetPrefetchHydrateProductProps = {
  productId: string;
  enable?: boolean; // 기본값은 true
};
const getPrefetchHydrateProduct = async ({
  productId,
  enable = true,
}: GetPrefetchHydrateProductProps) => {
  const queryClient = getQueryClient();

  // enable이 ture일때만 프리페치
  if (enable) {
    await queryClient.prefetchQuery({
      queryKey: [QueryKeys.PRODUCT, productId],
      queryFn: () => getProduct({ productId }),
    });
  }

  const dehydratedState = dehydrate(queryClient);
  return dehydratedState;
};

export default getPrefetchHydrateProduct;
