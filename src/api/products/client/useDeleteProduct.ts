import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import { publicAxiosInstance } from "@/util/fetchUtil/axionsInstance";

interface PutCreateProductBody {
  productId: string;
}

const deleteProduct = async ({ productId }: PutCreateProductBody) => {
  const response = await publicAxiosInstance.delete(`/products/${productId}`);
  return response.data;
};
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (deleteProductProps: PutCreateProductBody) =>
      deleteProduct(deleteProductProps),
    onSuccess: () => {
      // 상품 생성 성공 시, 상품 목록 캐시를 무효화하여 최신 데이터로 갱신
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCTS] });
    },
  });
};

export default useDeleteProduct;
