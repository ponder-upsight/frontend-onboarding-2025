import { ProductDetailItem } from "@/types/products";
import { publicAxiosInstance } from "@/util/fetchUtil/axionsInstance";

// 함수에 전달될 파라미터 타입
interface GetProductProps {
  productId: string;
}

// API가 반환하는 데이터의 타입
type GetProductResponse = ProductDetailItem;

const getProduct = async ({
  productId,
}: GetProductProps): Promise<GetProductResponse> => {
  const response = await publicAxiosInstance.get<GetProductResponse>(
    `/products/${productId}` // baseURL 이후의 경로만 입력
  );

  return response.data;
};

export default getProduct;
