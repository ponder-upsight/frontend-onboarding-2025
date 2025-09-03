import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import { publicAxiosInstance } from "@/util/fetchUtil/axionsInstance";
import { useRouter } from "next/navigation";
import { ProductListItem } from "@/types/products";
import revaildateTags from "@/app/api/revalidate";

interface DeleteProductParams {
  productId: string;
}

interface InfiniteProductData {
  pages: Array<{
    pageResult: ProductListItem[];
  }>;
  pageParams: unknown[];
}

interface ProductListResponse {
  pageResult: ProductListItem[];
}

const deleteProduct = async ({ productId }: DeleteProductParams) => {
  const response = await publicAxiosInstance.delete(`/products/${productId}`);
  return response.data;
};

const useDeleteProduct = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DeleteProductParams) => deleteProduct(params),

    onMutate: async ({ productId }) => {
      router.push("/");
      // 1. 진행 중인 모든 product 관련 쿼리를 취소합니다.
      await queryClient.cancelQueries({ queryKey: [QueryKeys.PRODUCTS] });

      // 2. 현재 캐시된 데이터들을 백업합니다.
      const previousInfiniteData =
        queryClient.getQueryData<InfiniteProductData>([
          QueryKeys.PRODUCTS,
          "infinite",
          20,
        ]);
      const previousPagedData = queryClient
        .getQueriesData({ queryKey: [QueryKeys.PRODUCTS] })
        .filter(
          ([key]) =>
            Array.isArray(key) && key.length === 2 && typeof key[1] === "number"
        );

      // 3. 무한 스크롤 쿼리에서 해당 상품을 제거합니다.
      queryClient.setQueryData<InfiniteProductData>(
        [QueryKeys.PRODUCTS, "infinite", 20],
        (oldData) => {
          if (!oldData) return oldData;

          const newPages = oldData.pages.map((page) => ({
            ...page,
            pageResult: page.pageResult.filter(
              (product: ProductListItem) => product.id !== productId
            ),
          }));

          return { ...oldData, pages: newPages };
        }
      );

      // 4. 페이지네이션된 쿼리들에서도 해당 상품을 제거합니다.
      previousPagedData.forEach(([queryKey]) => {
        queryClient.setQueryData<ProductListResponse>(queryKey, (oldData) => {
          if (!oldData?.pageResult) return oldData;

          return {
            ...oldData,
            pageResult: oldData.pageResult.filter(
              (product: ProductListItem) => product.id !== productId
            ),
          };
        });
      });
      // 5. 즉시 홈 페이지로 이동합니다.
      // router.push("/");

      // 6. 롤백을 위한 이전 데이터를 반환합니다.
      return { previousInfiniteData, previousPagedData };
    },

    // 에러 발생 시 데이터를 롤백합니다.
    onError: (err, variables, context) => {
      if (context?.previousInfiniteData) {
        queryClient.setQueryData(
          [QueryKeys.PRODUCTS, "infinite", 20],
          context.previousInfiniteData
        );
      }

      if (context?.previousPagedData) {
        context.previousPagedData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }

      alert("상품 삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
    },

    // 성공/실패 여부와 관계없이 서버 상태와 동기화합니다.
    onSettled: (error, data, variables) => {
      const { productId } = variables;
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCTS] });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PRODUCT, productId],
      });

      revaildateTags([QueryKeys.PRODUCTS, `${QueryKeys.PRODUCT}-${productId}`]);
    },
  });
};
export default useDeleteProduct;
