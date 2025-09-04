import { ProductDetailItem } from "@/shared/types/products"; // ProductDetail 타입을 정의해야 합니다.
import serverFetch from "@/shared/utils/fetchUtil/serverFetch";
import { QueryKeys } from "../QueryKeys";

interface GetProductParams {
  productId: string;
}
type GetProductResponse = ProductDetailItem | null;

const getProduct = async ({
  productId,
}: GetProductParams): Promise<GetProductResponse> => {
  const API_PATH = `/products/${productId}`;

  const result = await serverFetch<ProductDetailItem>(
    API_PATH,
    {
      next: {
        revalidate: 3600,
        tags: [`${QueryKeys.PRODUCT}-${productId}`], // 개별 상품 태그
      },
    } // 3600초 동안 캐시
  );

  if (result.isSuccess) {
    return result.data;
  } else {
    return null;
  }
};

export default getProduct;
