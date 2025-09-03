import { ProductListItem } from "@/types/products";
import { publicAxiosInstance } from "@/util/fetchUtil/axionsInstance";

// 함수에 전달될 파라미터 타입
interface GetProductListProps {
  page: number;
  size: number;
}

// API가 반환하는 데이터의 타입
interface GetProductListResponse {
  pageResult: ProductListItem[];
}

const getProductList = async ({
  page,
  size,
}: GetProductListProps): Promise<GetProductListResponse> => {
  const response = await publicAxiosInstance.get<GetProductListResponse>(
    "/products", // baseURL 이후의 경로만 입력
    {
      params: {
        page: page,
        size: size,
      },
    }
  );

  return response.data;
};

export default getProductList;
