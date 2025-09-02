import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import { publicAxiosInstance } from "@/util/fetchUtil/axionsInstance";

interface ProductCreateData {
  name: string;
  description: string;
  amount: number;
  stock: number;
  thumbnail: File; // 단일 파일
  detail: File[]; // 여러 개 파일
}

const postCreateProduct = async (newProduct: ProductCreateData) => {
  const formData = new FormData();
  formData.append("name", newProduct.name);
  formData.append("description", newProduct.description);
  formData.append("price", newProduct.amount.toString());
  formData.append("stock", newProduct.stock.toString());
  formData.append("thumbnail", newProduct.thumbnail);
  newProduct.detail.forEach((file) => {
    formData.append("detailImages", file);
  });

  const response = await publicAxiosInstance.post("/products", formData, {});

  return response.data;
};

export const usePostCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newProduct: ProductCreateData) =>
      postCreateProduct(newProduct),
    onSuccess: () => {
      // 상품 생성 성공 시, 상품 목록 캐시를 무효화하여 최신 데이터로 갱신
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCTS] });
    },
  });
};

export default usePostCreateProduct;
