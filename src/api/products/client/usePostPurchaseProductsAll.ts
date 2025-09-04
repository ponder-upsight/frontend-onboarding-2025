import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import useCartStore from "@/shared/lib/zustand/useCartStore";
import { useRouter } from "next/navigation";
import {
  postPurchaseProduct,
  PostPurchaseProductProps,
} from "./postPurchaseProduct";

const usePostPurchaseProductsAll = () => {
  const queryClient = useQueryClient();
  const { removeItem } = useCartStore();
  const router = useRouter();
  return useMutation({
    mutationFn: async (products: PostPurchaseProductProps[]) => {
      const results = await Promise.allSettled(
        products.map(postPurchaseProduct)
      );
      return results;
    },

    onError: () => {
      alert("상품 구매 중 오류가 발생했습니다. 다시 시도해주세요.");
    },

    onSuccess: (results, variables) => {
      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          removeItem(variables[index].productId);
        } else {
          console.error(
            `상품 ${variables[index].productId} 구매 실패`,
            result.reason
          );
        }
      });

      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCTS] });

      const successCount = results.filter(
        (r) => r.status === "fulfilled"
      ).length;
      const failCount = results.filter((r) => r.status === "rejected").length;

      if (failCount !== 0) {
        alert(
          `일부 상품 구매에 실패했습니다. (${successCount} 성공, ${failCount} 실패)`
        );
      } else {
        alert("모든 상품이 구매되었습니다.");
      }

      router.push("/");
    },
  });
};

export default usePostPurchaseProductsAll;
