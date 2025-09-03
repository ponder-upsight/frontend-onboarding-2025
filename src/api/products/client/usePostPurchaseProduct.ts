import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import { publicAxiosInstance } from "@/util/fetchUtil/axionsInstance";
import useCartStore from "@/lib/zustand/useCartStore";
import { useRouter } from "next/router";

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
  const { removeItem } = useCartStore();
  const router = useRouter();
  return useMutation({
    mutationFn: (postPurchaseProductProps: PostPurchaseProductProps) =>
      postPurchaseProduct(postPurchaseProductProps),

    onError: (error) => {
      console.error("상품 구매 중 오류 발생:", error);
      alert("상품 구매 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
    onSuccess: (data, variables) => {
      const { productId } = variables;
      // 상품 생성 성공 시, 상품 목록 캐시를 무효화하여 최신 데이터로 갱신
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCTS] });
      removeItem(productId);
      alert("상품이 성공적으로 구매되었습니다.");
      router.push("/");
    },
  });
};

export default usePostPurchaseProduct;
