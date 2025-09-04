import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import useCartStore from "@/shared/lib/zustand/useCartStore";
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

    onSuccess: (data, variables) => {
      const { productId } = variables;
      // 상품 생성 성공 시, 상품 목록 캐시를 무효화하여 최신 데이터로 갱신
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCTS] });
      removeItem(productId);
      router.push("/");
    },
  });
};

export default usePostPurchaseProduct;
