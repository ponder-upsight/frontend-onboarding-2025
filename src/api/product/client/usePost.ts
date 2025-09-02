"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getProductList,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  purchaseProduct,
} from "./api"; // 실제 API 함수들이 정의된 파일
import {
  ProductListItem,
  ProductDetail,
  ProductCreateData,
  ProductUpdateData,
} from "@/types/products"; // 프로젝트 타입 정의
import { AxiosError } from "axios";

// --- 1. Query Keys: 쿼리 캐시 관리를 위한 키 팩토리 ---
// ----------------------------------------------------
export const productQueryKeys = {
  all: ["products"] as const,
  lists: () => [...productQueryKeys.all, "list"] as const,
  list: (params: { size: number }) =>
    [...productQueryKeys.lists(), params] as const,
  details: () => [...productQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...productQueryKeys.details(), id] as const,
};

// --- 2. GET Hooks (데이터 조회) ---
// ----------------------------------------------------

/**
 * 상품 목록 무한 스크롤 조회를 위한 훅
 */
const PAGE_SIZE = 9;
interface UseGetProductListInfiniteRequest {
  size?: number;
}
export const useGetProductListInfinite = ({
  size = PAGE_SIZE,
}: UseGetProductListInfiniteRequest = {}) =>
  useInfiniteQuery({
    queryKey: productQueryKeys.list({ size }),
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => getProductList({ page: pageParam, size }),
    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지의 결과가 size와 같으면 다음 페이지가 있다고 간주
      if (lastPage.pageResult && lastPage.pageResult.length === size) {
        return allPages.length;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5, // 5분
    select: (data) => data.pages.flatMap((page) => page.pageResult),
  });

/**
 * 특정 상품의 상세 정보를 조회하기 위한 훅
 * @param productId - 조회할 상품의 ID
 */
export const useGetProductDetail = (productId: string) =>
  useQuery<ProductDetail, AxiosError>({
    queryKey: productQueryKeys.detail(productId),
    queryFn: () => getProduct(productId),
    enabled: !!productId, // productId가 있을 때만 쿼리 실행
  });

// --- 3. Mutation Hooks (데이터 변경) ---
// ----------------------------------------------------

/**
 * 새 상품을 생성하기 위한 훅
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newProduct: ProductCreateData) => createProduct(newProduct),
    onSuccess: () => {
      // 상품 생성 성공 시, 상품 목록 캐시를 무효화하여 최신 데이터로 갱신
      queryClient.invalidateQueries({ queryKey: productQueryKeys.lists() });
    },
  });
};

/**
 * 기존 상품 정보를 수정하기 위한 훅
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: {
      productId: string;
      updateData: ProductUpdateData;
    }) => updateProduct(variables),
    onSuccess: (_, variables) => {
      // 수정 성공 시, 해당 상품의 상세 정보와 전체 목록 캐시를 무효화
      queryClient.invalidateQueries({ queryKey: productQueryKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: productQueryKeys.detail(variables.productId),
      });
    },
  });
};

/**
 * 상품을 삭제하기 위한 훅 (낙관적 업데이트 예시 포함)
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      // 성공 시 목록을 확실하게 갱신
      queryClient.invalidateQueries({ queryKey: productQueryKeys.lists() });
    },
    // 예시: UX 향상을 위한 낙관적 업데이트
    onMutate: async (deletedProductId: string) => {
      await queryClient.cancelQueries({ queryKey: productQueryKeys.lists() });
      const previousProductList = queryClient.getQueryData(
        productQueryKeys.list({ size: PAGE_SIZE })
      );

      queryClient.setQueryData(
        productQueryKeys.list({ size: PAGE_SIZE }),
        (oldData: any) => {
          const newPages = oldData.pages.map((page: any) => ({
            ...page,
            pageResult: page.pageResult.filter(
              (product: ProductListItem) => product.id !== deletedProductId
            ),
          }));
          return { ...oldData, pages: newPages };
        }
      );
      return { previousProductList };
    },
    onError: (err, newTodo, context: any) => {
      // 에러 발생 시 이전 데이터로 롤백
      queryClient.setQueryData(
        productQueryKeys.list({ size: PAGE_SIZE }),
        context.previousProductList
      );
    },
  });
};

/**
 * 상품을 구매(주문)하기 위한 훅
 */
export const usePurchaseProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: { productId: string; quantity: number }) =>
      purchaseProduct(variables),
    onSuccess: (_, variables) => {
      // 구매 성공 시 재고가 변경될 수 있으므로 해당 상품 상세 정보와 목록 캐시를 무효화
      queryClient.invalidateQueries({
        queryKey: productQueryKeys.detail(variables.productId),
      });
      queryClient.invalidateQueries({ queryKey: productQueryKeys.lists() });
    },
  });
};
