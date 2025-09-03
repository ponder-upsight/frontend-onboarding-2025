"use client";

/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";

import { useTranslation } from "@/app/i18n/client";
import { Box, Grid, Flex } from "@chakra-ui/react";
import { TypoGraph } from "@/app/components/ui/Typography";
import ProductCard from "./components/Product/ProductCard";
import { Product, useGetProducts } from "@/api/product/getProducts";
import { useDeleteProduct } from "@/api/product/deleteProduct";
import { LoadingSpinner } from "@/app/components/ui/LoadingSpinner";
import { useRouter } from "next/navigation";

type PageProps = {
  params: Promise<{
    lng: string;
  }>;
};

const HomePage = ({ params }: PageProps) => {
  const [lng, setLng] = useState<string>("");
  const { t } = useTranslation(lng);
  const router = useRouter();
  const { data: products, isPending } = useGetProducts();
  const { mutate } = useDeleteProduct()

  const handleProductDetail = (product: Product) => {
    router.push(`product/${product.id}`);
  };

  const handleDeleteProduct = (product: Product) => {
    mutate(product.id);
  };

  useEffect(() => {
    params.then((resolvedParams) => {
      setLng(resolvedParams.lng);
    });
  }, [params]);

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
              lng={lng}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;