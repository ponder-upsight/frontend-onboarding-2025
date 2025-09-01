"use client";

import { useState } from "react";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { Button } from "@/app/components/ui/Button";
import { TypoGraph } from "@/app/components/ui/Typography";
import { EyeOn } from "@/assets/icons";
import { Product } from "@/data/products";
import { useTranslation } from "@/app/i18n/client";

interface ProductCardProps {
  product: Product;
  onDetailClick: (product: Product) => void;
  lng: string;
}

const ProductCard = ({ product, onDetailClick, lng }: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);
  const { t } = useTranslation(lng);

  return (
    <Box
      bg="white"
      borderRadius="8px"
      boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)"
      overflow="hidden"
    >
      <Box
        h="200px"
        bg="gray.100"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        {imageError ? (
          <Box
            w="160px"
            h="160px"
            bg="gray.200"
            borderRadius="4px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <TypoGraph variant="label04" color="gray.500">
              {t("imageNone")}
            </TypoGraph>
          </Box>
        ) : (
          <Box
            as="img"
            src={product.imageUrl}
            alt={product.name}
            maxH="160px"
            maxW="160px"
            objectFit="contain"
            onError={() => setImageError(true)}
          />
        )}
      </Box>
      
      <VStack spacing="12px" p="20px" align="stretch">
        <TypoGraph variant="headline03" color="gray.900">
          {product.name}
        </TypoGraph>
        
        <TypoGraph 
          variant="body02" 
          color="gray.700"
          noOfLines={2}
          minH="44px"
        >
          {product.description}
        </TypoGraph>
        
        <Flex justify="space-between" align="center">
          <TypoGraph variant="label05" color="gray.600">
            {t("stock", { count: product.stock })}
          </TypoGraph>
          <TypoGraph variant="label06" color="gray.500">
            {product.createdAt}
          </TypoGraph>
        </Flex>
        
        <Button
          variant="neutral"
          size="sm"
          w="100%"
          leftIcon={<EyeOn width="16px" height="16px" />}
          onClick={(e) => {
            e.stopPropagation();
            onDetailClick(product);
          }}
        >
          {t("viewDetail")}
        </Button>
      </VStack>
    </Box>
  );
};

export default ProductCard;
