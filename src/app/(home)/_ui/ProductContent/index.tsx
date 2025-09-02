"use client";

import { Product } from "@/types/products";
import { Grid } from "@chakra-ui/react";
import ProductCard from "../ProudctCard";
import { Flex, Heading, Text } from "@chakra-ui/react";
import useGetProductList from "@/api/product/useGetProductList";
import { useState } from "react";
import ProductCardSkeleton from "../ProudctCard/skeleton";

const ProductContent = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useGetProductList(page);
  const { totalPageCount = 0, productList = [] } = data || {};

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
      {isLoading ? (
        <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
          {Array.from({ length: 9 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </Grid>
      ) : (
        <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
          {productList.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      )}

      {/* page nation */}
      <Flex justifyContent={"center"} mt={4} gap={2}>
        {Array.from({ length: totalPageCount }, (_, idx) => {
          const pageNumber = idx + 1;
          return (
            <Text
              key={pageNumber}
              as="button"
              onClick={() => setPage(pageNumber)}
              fontWeight={page === pageNumber ? 700 : 500}
              color={page === pageNumber ? "blue.500" : "gray.600"}
              _hover={{
                textDecoration: page === pageNumber ? "none" : "underline",
                cursor: "pointer",
              }}>
              {pageNumber}
            </Text>
          );
        })}
      </Flex>
    </Flex>
  );
};
export default ProductContent;
