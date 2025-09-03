import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import { publicAxiosInstance } from "@/util/fetchUtil/axionsInstance";

interface PutCreateProductBody {
  productId: string;
  name: string;
  description: string;
  stock: number;
  deletedImageIds: string[];
  newThumbnail: File; // string($binary)
  newDetailImages: File[]; // array of binary strings
}

const putModifyProduct = async (newProduct: PutCreateProductBody) => {
  const formData = new FormData();
  formData.append("name", newProduct.name);
  formData.append("description", newProduct.description);
  formData.append("stock", newProduct.stock.toString());

  newProduct.deletedImageIds.forEach((id) => {
    formData.append("deletedImageIds", id);
  });

  formData.append("newThumbnail", newProduct.newThumbnail);

  newProduct.newDetailImages.forEach((file) => {
    formData.append("newDetailImages", file);
  });

  const response = await publicAxiosInstance.post("/products", formData, {});
  return response.data;
};
export const usePutModifyProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newProduct: PutCreateProductBody) =>
      putModifyProduct(newProduct),
    onSuccess: () => {
      // 상품 생성 성공 시, 상품 목록 캐시를 무효화하여 최신 데이터로 갱신
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCTS] });
    },
  });
};

export default usePutModifyProduct;
