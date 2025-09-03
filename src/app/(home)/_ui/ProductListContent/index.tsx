"use client";

import { ProductListItem } from "@/types/products";
import { Grid } from "@chakra-ui/react";
import ProductCard from "./_ui/ProudctCard";
import { Flex, Heading, Text } from "@chakra-ui/react";
import ProductCardSkeleton from "./_ui/ProudctCard/skeleton";
import useGetProductListInfinite from "@/api/products/client/useGetInfinityProductList";
import useInfinityScroll from "@/util/hooks/useInfinityScroll";

const ProductListContent = () => {
  // get product list
  const {
    data: productList = [],
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetProductListInfinite();
  const { lastElementRef } = useInfinityScroll({ fetchNextPage, hasNextPage });

  const productCount = productList.length;

  return (
    <Flex direction={"column"} gap={2} width={"100%"} maxWidth={1200}>
      {/* title */}
      <Heading
        as={"h2"}
        size={"lg"}
        color={"primary.500"}
        fontWeight={500}
        textAlign={"start"}>
        상품 목록
      </Heading>
      <Text color={"gray.600"}>
        총 {productCount}개의 상품이 등록되어 있습니다.
      </Text>

      {/* product Cards */}
      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
        {/* 초기 로딩 중일 때만 스켈레톤만 표시 */}
        {isLoading && productList.length === 0 && (
          <>
            {Array.from({ length: 9 }).map((_, idx) => (
              <ProductCardSkeleton key={`initial-skeleton-${idx}`} />
            ))}
          </>
        )}

        {/* 기존 상품 카드들 */}
        {productList.map((product: ProductListItem, index) => {
          const isLast = index === productList.length - 1;
          return (
            <ProductCard
              observeRef={isLast ? lastElementRef : undefined}
              key={product.id}
              product={product}
            />
          );
        })}

        {/* 다음 페이지 로딩 중일 때 추가 스켈레톤 */}
        {isFetchingNextPage && (
          <>
            {Array.from({ length: 6 }).map((_, idx) => (
              <ProductCardSkeleton key={`loading-skeleton-${idx}`} />
            ))}
          </>
        )}
      </Grid>
    </Flex>
  );
};
export default ProductListContent;
