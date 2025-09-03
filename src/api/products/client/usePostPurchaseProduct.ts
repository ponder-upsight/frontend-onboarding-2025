import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import { publicAxiosInstance } from "@/util/fetchUtil/axionsInstance";

interface PostPurchaseProductProps {
  productId: string;
  quantity: number;
}

const postPurchaseProduct = async ({
  productId,
  quantity,
}: PostPurchaseProductProps) => {
  const response = await publicAxiosInstance.post(`/products/${productId}`, {
    quantity,
  });
  return response.data;
};
export const usePostPurchaseProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postPurchaseProductProps: PostPurchaseProductProps) =>
      postPurchaseProduct(postPurchaseProductProps),
    onSuccess: () => {
      // 상품 생성 성공 시, 상품 목록 캐시를 무효화하여 최신 데이터로 갱신
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCTS] });
    },
  });
};

export default usePostPurchaseProduct;
