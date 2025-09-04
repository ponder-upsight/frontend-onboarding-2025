"use client";

/** @jsxImportSource @emotion/react */
import { useRouter } from "next/navigation";

import { Product } from "@/domain/product/Product";
import { ProductService } from "@/service/product/ProductService";
import { Box, Flex, Grid } from "@chakra-ui/react";

import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { TypoGraph } from "@/components/ui/Typography";

import { CartSection } from "@/app/[lng]/components/Cart/CartSection";
import { useI18n } from "@/app/i18n/I18nProvider";

import ProductCard from "./components/Product/ProductCard";

const HomePage = () => {
  const { t } = useI18n();
  const router = useRouter();
  const deleteProduct = ProductService.useDeleteProduct();
  const getProducts = ProductService.useGetProducts();

  const handleProductDetail = (product: Product) => {
    router.push(`product/${product.id}`);
  };

  const handleDeleteProduct = (product: Product) => {
    deleteProduct.mutate(product.id!);
  };

  if (getProducts.isPending) {
    return (
      <Box minH="100vh" bg="gray.50" pt="128px">
        <Box maxW="1200px" mx="auto" p="32px">
          <Flex alignItems="center" gap="16px">
            <LoadingSpinner size={20} color="#101010" />
            <TypoGraph variant="headline01" color="gray.800">
              {t("ui.loading")}
            </TypoGraph>
          </Flex>
        </Box>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50" pt="128px">
      <Box maxW="1200px" mx="auto" p="32px">
        <Flex justify="space-between" direction="column" align="flex-start" mb="24px">
          <TypoGraph variant="headline01" color="blue.700">
            {t("product.list.title")}
          </TypoGraph>
          <TypoGraph variant="body02" color="gray.700">
            {t("product.list.totalProducts", { count: getProducts.data?.length })}
          </TypoGraph>
        </Flex>

        <Grid
          templateColumns="repeat(auto-fill, minmax(320px, 1fr))"
          gap="24px"
          w="100%"
          mb="48px"
        >
          {getProducts.data?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDetailClick={handleProductDetail}
              onDeleteClick={handleDeleteProduct}
            />
          ))}
        </Grid>

        <CartSection />
      </Box>
    </Box>
  );
};

export default HomePage;
