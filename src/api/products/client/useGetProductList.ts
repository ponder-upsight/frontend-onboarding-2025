import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import getProductList from "./getProductList";
import { ProductListItem } from "@/shared/types/products";

const PAGE_SIZE = 20; // 한 페이지당 상품 수

interface GetProductListResponse {
  pageResult: ProductListItem[];
}

// 훅이 페이지 번호를 인자로 받도록 수정 (page: number)
const useGetProductList = (page: number) => {
  // useQuery의 결과를 return하여 컴포넌트에서 사용할 수 있도록 함
  return useQuery<GetProductListResponse>({
    // 쿼리 키에 인자로 받은 page를 사용
    queryKey: [QueryKeys.PRODUCTS, page],

    // 쿼리 함수에 인자로 받은 page를 전달
    queryFn: () => getProductList({ page, size: PAGE_SIZE }),

    staleTime: 1000 * 60 * 5, // 5분
  });
};

export default useGetProductList;
