import { CartItem } from "@/domain/cart/CartItem";
import { useCart } from "@/domain/cart/useCart";
import { Box, VStack } from "@chakra-ui/react";

import { TypoGraph } from "@/app/components/ui/Typography";
import { useI18n } from "@/app/i18n/I18nProvider";

import { CartItemCard } from "./CartItemCard";

export const CartSection = () => {
  const { t } = useI18n();
  const { items: cartItems } = useCart();

  return (
    <VStack spacing="0" align="stretch">
      <Box mb="24px">
        <TypoGraph variant="headline01" color="blue.700">
          {t("cart")}
        </TypoGraph>
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
