import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import { publicAxiosInstance } from "@/util/fetchUtil/axionsInstance";
import { useRouter } from "next/navigation";
import revalidateTags from "@/app/api/revalidate";

interface PutCreateProductProps {
  productId: string;
  name: string;
  description: string;
  stock: number;
  deletedImageIds: string[];
  newThumbnail?: File; // string($binary) - 선택사항
  newDetailImages: File[]; // array of binary strings
}

const putModifyProduct = async (newProduct: PutCreateProductProps) => {
  const {
    productId,
    name,
    description,
    stock,
    deletedImageIds,
    newThumbnail,
    newDetailImages,
  } = newProduct;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("stock", stock.toString());

  deletedImageIds.forEach((id) => {
    formData.append("deletedImageIds", id);
  });

  // newThumbnail이 있을 때만 추가
  if (newThumbnail) {
    formData.append("newThumbnail", newThumbnail);
  }

  newDetailImages.forEach((file) => {
    formData.append("newDetailImages", file);
  });

  const response = await publicAxiosInstance.put(
    `/products/${productId}`,
    formData,
    {}
  );
  return response.data;
};
export const usePutModifyProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (newProduct: PutCreateProductProps) =>
      putModifyProduct(newProduct),

    // 낙관적 업데이트
    onMutate: async (variables) => {
      const { productId, name, description, stock } = variables;

      router.push(`/product/${productId}?updated=true`);

      // 진행 중인 쿼리들을 취소
      await queryClient.cancelQueries({
        queryKey: [QueryKeys.PRODUCT, productId],
      });
      await queryClient.cancelQueries({ queryKey: [QueryKeys.PRODUCTS] });

      // 이전 데이터 백업
      const previousProduct = queryClient.getQueryData([
        QueryKeys.PRODUCT,
        productId,
      ]);
      const previousProductList = queryClient.getQueryData([
        QueryKeys.PRODUCTS,
      ]);

      // 상세 페이지 캐시 즉시 업데이트
      queryClient.setQueryData(
        [QueryKeys.PRODUCT, productId],
        (old: unknown) => {
          if (!old || typeof old !== "object") return old;
          return {
            ...(old as Record<string, unknown>),
            name,
            description,
            stock,
          };
        }
      );

      // 상품 목록 캐시 즉시 업데이트
      queryClient.setQueryData([QueryKeys.PRODUCTS], (old: unknown) => {
        if (!old || typeof old !== "object") return old;
        const oldData = old as { pageResult?: unknown[] };
        if (!oldData.pageResult || !Array.isArray(oldData.pageResult))
          return old;

        return {
          ...oldData,
          pageResult: oldData.pageResult.map((product: unknown) => {
            if (typeof product !== "object" || !product) return product;
            const prod = product as { id?: string };
            return prod.id === productId
              ? { ...prod, name, description, stock }
              : product;
          }),
        };
      });

      return { previousProduct, previousProductList };
    },

    // 에러 시 롤백
    onError: (err, variables, context) => {
      if (context?.previousProduct) {
        queryClient.setQueryData(
          [QueryKeys.PRODUCT, variables.productId],
          context.previousProduct
        );
      }
      if (context?.previousProductList) {
        queryClient.setQueryData(
          [QueryKeys.PRODUCTS],
          context.previousProductList
        );
      }
    },

    onSettled: (data, error, variables) => {
      const { productId } = variables;

      // 백그라운드에서 ISR 페이지 revalidation

      // // 백그라운드에서 서버 데이터 재검증
      // queryClient.invalidateQueries({
      //   queryKey: [QueryKeys.PRODUCT, productId],
      // });
      // queryClient.invalidateQueries({
      //   queryKey: [QueryKeys.PRODUCTS],
      // });

      revalidateTags([QueryKeys.PRODUCTS, `${QueryKeys.PRODUCT}-${productId}`]);
      // 낙관적으로 즉시 페이지 이동
    },
  });
};

export default usePutModifyProduct;
