import { ProductDetailItem } from "@/types/products"; // ProductDetail 타입을 정의해야 합니다.
import serverFetch from "@/util/fetchUtil/serverFetch";

interface GetProductParams {
  productId: string;
}
type GetProductResponse = ProductDetailItem | null;

const getProduct = async ({
  productId,
}: GetProductParams): Promise<GetProductResponse> => {
  const API_PATH = `/api/v1/products/${productId}`;

  const result = await serverFetch<ProductDetailItem>(
    API_PATH,
    { next: { revalidate: 3600 } } // 3600초 동안 캐시
  );

  if (result.isSuccess) {
    return result.data;
  } else {
    console.error("API Error:", result.status, result.error);
    return null;
  }
};

export default getProduct;
