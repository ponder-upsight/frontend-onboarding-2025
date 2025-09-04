import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import useCartStore from "@/lib/zustand/useCartStore";
import { useRouter } from "next/navigation";
import {
  postPurchaseProduct,
  PostPurchaseProductProps,
} from "./postPurchaseProduct";

const usePostPurchaseProduct = () => {
  const queryClient = useQueryClient();
  const { removeItem } = useCartStore();
  const router = useRouter();
  return useMutation({
    mutationFn: (postPurchaseProductProps: PostPurchaseProductProps) =>
      postPurchaseProduct(postPurchaseProductProps),

    onError: () => {
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
