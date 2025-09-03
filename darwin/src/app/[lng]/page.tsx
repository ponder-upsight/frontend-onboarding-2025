"use client";

/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";

import { Box, Grid, Flex } from "@chakra-ui/react";
import { TypoGraph } from "@/app/components/ui/Typography";
import ProductCard from "./components/Product/ProductCard";
import { Product, useGetProducts } from "@/api/product/getProducts";
import { useDeleteProduct } from "@/api/product/deleteProduct";
import { LoadingSpinner } from "@/app/components/ui/LoadingSpinner";
import { useRouter } from "next/navigation";
import { useI18n } from "@/app/i18n/I18nProvider";

const HomePage = () => {
  const { t } = useI18n();
  const router = useRouter();
  const { data: products, isPending } = useGetProducts();
  const { mutate } = useDeleteProduct()

  const handleProductDetail = (product: Product) => {
    router.push(`product/${product.id}`);
  };

  const handleDeleteProduct = (product: Product) => {
    mutate(product.id);
  };

  if (isPending) {
    return (
      <Box minH="100vh" bg="gray.50" pt="128px">
        <Box maxW="1200px" mx="auto" p="32px">
          <Flex
            alignItems="center"
            gap="16px"
          >
          <LoadingSpinner size={20} color="#101010" />
          <TypoGraph variant="headline01" color="gray.800">
            {t("loading")}
          </TypoGraph>
          </Flex>
        </Box>
      </Box>
    )
  }

  return (
    <Box minH="100vh" bg="gray.50" pt="128px">
      <Box maxW="1200px" mx="auto" p="32px">
        <Flex justify="space-between" direction="column" align="flex-start" mb="24px">
          <TypoGraph variant="headline01" color="blue.700">
            {t("productList")}
          </TypoGraph>
          <TypoGraph variant="body02" color="gray.700">
            {t("totalProducts", { count: products?.length })}
          </TypoGraph>
        </Flex>

        <Grid
          templateColumns="repeat(auto-fill, minmax(320px, 1fr))"
          gap="24px"
          w="100%"
        >
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDetailClick={handleProductDetail}
              onDeleteClick={handleDeleteProduct}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
