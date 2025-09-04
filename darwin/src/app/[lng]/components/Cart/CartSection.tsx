import { CartItem } from "@/domain/cart/CartItem";
import { CartService } from "@/service/cart/CartService";
import { ProductService } from "@/service/product/ProductService";
import { Box, HStack, Image, Skeleton, VStack } from "@chakra-ui/react";

import { Button } from "@/components/ui/Button";
import { TypoGraph } from "@/components/ui/Typography";
import { useI18n } from "@/app/i18n/I18nProvider";

export const CartSection = () => {
  const { t } = useI18n();
  const cartItems = CartService.useCartItems();
  const clearCart = CartService.useClear();

  return (
    <VStack spacing="0" align="stretch">
      <Box mb="24px">
        <HStack justify="space-between" align="start" mb="4px">
          <TypoGraph variant="headline01" color="blue.700">
            {t("cart")}
          </TypoGraph>
          {cartItems.length > 0 && (
            <Button variant="outlined" onClick={clearCart} w="64px" h="32px">
              {t("clearCart")}
            </Button>
          )}
        </HStack>
        <TypoGraph variant="body02" color="gray.700">
          {t("cartItemsCount", { count: cartItems.length })}
        </TypoGraph>
      </Box>

      {cartItems.length === 0 ? (
        <Box textAlign="center" p="40px" borderRadius="4px" bg="gray.100">
          <TypoGraph variant="body02" color="gray.700">
            {t("cartEmpty")}
          </TypoGraph>
        </Box>
      ) : (
        <VStack spacing="12px" align="stretch">
          {cartItems.map((item: CartItem) => (
            <CartItemCard key={item.productId} item={item} />
          ))}
        </VStack>
      )}
    </VStack>
  );
};

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard = ({ item }: CartItemCardProps) => {
  const { t } = useI18n();
  const { data: productDetails, isLoading } = ProductService.useGetProductDetails(
    item.productId
  );

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
