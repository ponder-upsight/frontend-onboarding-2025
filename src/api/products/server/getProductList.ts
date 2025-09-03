import { ProductListItem } from "@/types/products";
import serverFetch from "@/util/fetchUtil/serverFetch"; // serverFetch 경로에 맞게 수정해주세요
import { QueryKeys } from "../QueryKeys";

// API 응답의 실제 데이터 구조를 정의합니다.
type GetProductListResponse = {
  pageResult: ProductListItem[];
} | null;

// 함수에 전달될 파라미터 타입을 정의합니다.
interface GetProductListParams {
  page: number;
  size: number;
  name?: string;
  description?: string;
  sortCode?: string;
}

const getProductList = async ({
  page,
  size,
  name,
  description,
  sortCode,
}: GetProductListParams): Promise<GetProductListResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  if (name) params.append("name", name);
  if (description) params.append("description", description);
  if (sortCode) params.append("sortCode", sortCode);

  const API_PATH = `/products?${params.toString()}`;

  // serverFetch를 호출하고, 예상되는 응답 데이터 타입을 제네릭으로 전달합니다.
  const result = await serverFetch<GetProductListResponse>(
    API_PATH,
    {
      next: {
        revalidate: 3600,
        tags: [QueryKeys.PRODUCTS], // 개별 상품 태그
      },
    } // 3600초 동안 캐시
  );

  // serverFetch가 반환한 결과를 처리합니다.
  if (result.isSuccess) {
    // 성공 시, API 데이터를 우리가 사용하려는 형태로 변환하여 반환합니다.
    return result.data;
  } else {
    return null;
  }
};

export default getProductList;
