import { Product } from "@/types/products";
import { dummyProducts } from "../dummy";

type getProductListResponse = {
  totalPageCount: number;
  productList: Product[];
};

const getProductList = async (
  page: number,
  size: number
): Promise<getProductListResponse> => {
  // 네트워크 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 2. 총 페이지 수를 올바르게 계산합니다.
  const totalPageCount = Math.ceil(dummyProducts.length / size);

  return {
    totalPageCount,
    productList: dummyProducts.slice((page - 1) * size, page * size),
  };
};

export default getProductList;
