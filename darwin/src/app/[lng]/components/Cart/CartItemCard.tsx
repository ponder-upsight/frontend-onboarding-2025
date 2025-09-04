import { CartItem } from "@/domain/cart/CartItem";
import { useProduct } from "@/domain/product/useProduct";
import { Box, HStack, Image, Skeleton, VStack } from "@chakra-ui/react";

import { TypoGraph } from "@/app/components/ui/Typography";
import { useI18n } from "@/app/i18n/I18nProvider";

interface CartItemCardProps {
  item: CartItem;
}

export const CartItemCard = ({ item }: CartItemCardProps) => {
  const { t } = useI18n();
  const { useGetProductDetails } = useProduct();
  const { data: productDetails, isLoading } = useGetProductDetails(item.productId);

  if (isLoading) {
    return (
      <HStack
        spacing="16px"
        p="20px"
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="12px"
        bg="white"
      >
        <Skeleton w="80px" h="80px" borderRadius="8px" />
        <VStack align="start" flex={1} spacing="8px">
          <Skeleton h="20px" w="140px" />
          <Skeleton h="16px" w="80px" />
        </VStack>
      </HStack>
    );
  }

  if (!productDetails) {
    return null;
  }

  return (
    <HStack
      spacing="16px"
      p="16px"
      borderWidth="1px"
      borderColor="gray.300"
      borderRadius="4px"
      bg="white"
    >
      <Image
        src={productDetails.thumbnailUrl}
        alt={productDetails.name}
        w="60px"
        h="60px"
        objectFit="cover"
        borderRadius="4px"
        fallback={<Box w="60px" h="60px" bg="gray.100" borderRadius="4px" />}
      />
      <VStack align="start" flex={1} spacing="4px">
        <TypoGraph variant="headline03" color="gray.900">
          {productDetails.name}
        </TypoGraph>
        <TypoGraph variant="label03" color="gray.600">
          {t("quantity", { count: item.quantity })}
        </TypoGraph>
      </VStack>
    </HStack>
  );
};
