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

  const result = await serverFetch<GetProductListResponse>(API_PATH, {
    next: {
      revalidate: 3600,
      tags: [QueryKeys.PRODUCTS],
    },
  });

  if (result.isSuccess) {
    return result.data;
  } else {
    return null;
  }
};

export default getProductList;
