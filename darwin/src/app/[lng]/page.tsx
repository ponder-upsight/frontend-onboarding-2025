"use client";

/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";

import { useTranslation } from "@/app/i18n/client";
import { Box, Grid, Flex } from "@chakra-ui/react";
import { TypoGraph } from "@/app/components/ui/Typography";
import { Product, products } from "@/data/products";
import ProductCard from "./components/Product/ProductCard";

type PageProps = {
  params: Promise<{
    lng: string;
  }>;
};

const HomePage = ({ params }: PageProps) => {
  const [lng, setLng] = useState<string>("");
  const { t, i18n, ready } = useTranslation(lng);

  const handleProductDetail = (product: Product) => {
    window.location.href = `/${lng}/product/${product.id}`;
  };

  useEffect(() => {
    params.then((resolvedParams) => {
      setLng(resolvedParams.lng);
    });
  }, [params]);

  return (
    <Box minH="100vh" bg="gray.50" pt="128px">
      <Box maxW="1200px" mx="auto" p="32px">
        <Flex justify="space-between" direction="column" align="flex-start" mb="24px">
          <TypoGraph variant="headline01" color="blue.700">
            {t("productList")}
          </TypoGraph>
          <TypoGraph variant="body02" color="gray.700">
            {t("totalProducts", { count: products.length })}
          </TypoGraph>
        </Flex>
        
        <Grid
          templateColumns="repeat(auto-fill, minmax(320px, 1fr))"
          gap="24px"
          w="100%"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDetailClick={handleProductDetail}
              lng={lng}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;