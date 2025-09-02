import { ProductListItem } from "@/types/products";
import { axiosInstance } from "@/util/fetchUtil/axionsInstance";

// 함수에 전달될 파라미터 타입
interface GetProductListParams {
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
}: GetProductListParams): Promise<GetProductListResponse> => {
  try {
    // axiosInstance.get<T>()를 사용하여 응답 데이터의 타입을 지정합니다.
    const response = await axiosInstance.get<GetProductListResponse>(
      "/api/v1/products", // baseURL 이후의 경로만 입력
      {
        params: {
          page: page, // API 스펙에 따라 0-based index
          size: size,
        },
      }
    );

    // axios는 응답 데이터를 response.data에 담아 반환합니다.
    return response.data;
  } catch (error) {
    // axiosInstance에서 발생한 에러를 처리하거나 다시 던집니다.
    // React Query 등에서 에러를 처리할 수 있도록 에러를 다시 던지는 것이 좋습니다.
    console.error("상품 목록 조회 API 오류:", error);
    throw new Error("상품 목록을 가져오는 데 실패했습니다.");
  }
};

export default getProductList;
