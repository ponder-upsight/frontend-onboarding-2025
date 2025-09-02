import { Product } from "@/types/products";
import { dummyProducts } from "../dummy";

type getProductResponse = {
  product: Product;
};

const getProduct = async (id: string): Promise<getProductResponse> => {
  // 네트워크 지연 시뮬레이션
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    product: dummyProducts.find((product) => product.id === `${id}`)!,
  };
};

export default getProduct;
