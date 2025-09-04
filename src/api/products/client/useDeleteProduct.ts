import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import { publicAxiosInstance } from "@/shared/utils/fetchUtil/axionsInstance";
import { useRouter } from "next/navigation";
import { ProductListItem } from "@/shared/types/products";
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
      // 1. 진행 중인 모든 product 관련 쿼리를 취소
      await queryClient.cancelQueries({ queryKey: [QueryKeys.PRODUCTS] });

      // 2. 현재 캐시된 데이터들을 백업
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

      // 3. 무한 스크롤 쿼리에서 해당 상품을 제거
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

      // 4. 페이지네이션된 쿼리들에서도 해당 상품을 제거
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
      // 롤백을 위한 데이터를 반환
      return { previousInfiniteData, previousPagedData };
    },

    // 에러 발생 시 데이터를 롤백
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

      // 애러 토스트 메시지를 위한 에러 throw
      throw err;
    },

    // 성공/실패 여부와 관계없이 서버 상태와 동기화
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
