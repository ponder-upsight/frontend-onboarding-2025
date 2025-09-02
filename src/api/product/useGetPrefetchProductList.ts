import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "./QueryKeys";
import getProductList from "./getProductList";

const PAGE_SIZE = 9; // 한 페이지당 상품 수

interface UseGetPrefetchProductListReturn {
  handlePrefetchNextPage: () => void;
}

interface UseGetPrefetchProductListProps {
  nextPage: number;
  totalPageCount: number;
}

const useGetPrefetchProductList = ({
  nextPage,
  totalPageCount,
}: UseGetPrefetchProductListProps): UseGetPrefetchProductListReturn => {
  const queryClient = useQueryClient();
  // 마지막 페이지가 아닐 때만 프리페치를 실행합니다.

  console.log("nextPage, totalPageCount", nextPage, totalPageCount);
  const handlePrefetchNextPage = () => {
    // 이 함수는 훅이 아니므로 이벤트 핸들러에서 자유롭게 호출 가능
    if (nextPage <= totalPageCount) {
      console.log("Prefetching page:", nextPage);
      queryClient.prefetchQuery({
        queryKey: [QueryKeys.PRODUCTS, nextPage],
        queryFn: () => getProductList(nextPage, PAGE_SIZE),
      });
    }
  };
  return {
    handlePrefetchNextPage,
  };
};
export default useGetPrefetchProductList;
