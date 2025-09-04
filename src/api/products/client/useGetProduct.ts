import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import getProduct from "./getProduct";
import { ProductDetailItem } from "@/shared/types/products";

type GetProductListResponse = ProductDetailItem;

// 훅이 페이지 번호를 인자로 받도록 수정 (page: number)
const useGetProduct = (productId: string) => {
  // useQuery의 결과를 return하여 컴포넌트에서 사용할 수 있도록 함
  return useQuery<GetProductListResponse>({
    // 쿼리 키에 인자로 받은 page를 사용
    queryKey: [QueryKeys.PRODUCT, productId],

    // 쿼리 함수에 인자로 받은 page를 전달
    queryFn: () => getProduct({ productId }),

    staleTime: 1000 * 60 * 5, // 5분ㄱ
  });
};

export default useGetProduct;
