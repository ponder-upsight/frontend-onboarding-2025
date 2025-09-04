import { CartItem } from "@/domain/cart/CartItem";
import { useCart } from "@/domain/cart/useCart";
import { Box, VStack, HStack } from "@chakra-ui/react";

import { Button } from "@/app/components/ui/Button";
import { TypoGraph } from "@/app/components/ui/Typography";
import { useI18n } from "@/app/i18n/I18nProvider";

import { CartItemCard } from "./CartItemCard";

export const CartSection = () => {
  const { t } = useI18n();
  const cart = useCart();

  return (
    <VStack spacing="0" align="stretch">
      <Box mb="24px">
        <HStack justify="space-between" align="start" mb="4px">
          <TypoGraph variant="headline01" color="blue.700">
            {t("cart")}
          </TypoGraph>
          {cart.items.length > 0 && (
            <Button
              variant="outlined"
              onClick={cart.clear}
              w="64px"
              h="32px"
            >
              {t("clearCart")}
            </Button>
          )}
        </HStack>
        <TypoGraph variant="body02" color="gray.700">
          {t("cartItemsCount", { count: cart.items.length })}
        </TypoGraph>
      </Box>

      {cart.items.length === 0 ? (
        <Box textAlign="center" p="40px" borderRadius="4px" bg="gray.100">
          <TypoGraph variant="body02" color="gray.700">
            {t("cartEmpty")}
          </TypoGraph>
        </Box>
      ) : (
        <VStack spacing="12px" align="stretch">
          {cart.items.map((item: CartItem) => (
            <CartItemCard key={item.productId} item={item} />
          ))}
        </VStack>
      )}
    </VStack>
  );
};
