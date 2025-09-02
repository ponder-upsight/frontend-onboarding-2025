import { ProductListItem } from "@/types/products";
import serverFetch from "@/util/fetchUtil/serverFetch"; // serverFetch 경로에 맞게 수정해주세요

// API 응답의 실제 데이터 구조를 정의합니다.
interface GetProductListResponse {
  pageResult: ProductListItem[];
}

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

  const API_PATH = `/api/v1/products?${params.toString()}`;

  // serverFetch를 호출하고, 예상되는 응답 데이터 타입을 제네릭으로 전달합니다.
  const result = await serverFetch<GetProductListResponse>(API_PATH);

  // serverFetch가 반환한 결과를 처리합니다.
  if (result.isSuccess) {
    // 성공 시, API 데이터를 우리가 사용하려는 형태로 변환하여 반환합니다.
    return {
      pageResult: result.data.pageResult,
    };
  } else {
    // 실패 시, 에러를 던져서 호출부(예: React Query)에서 처리하도록 합니다.
    console.error("API Error:", result.status, result.error);
    throw new Error(result.error || "Failed to fetch product list");
  }
};

export default getProductList;
