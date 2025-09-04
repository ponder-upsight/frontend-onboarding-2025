"use client";
import {
  Container,
  Heading,
  VStack,
  Divider,
  Flex,
  Spacer,
  Button,
} from "@chakra-ui/react";
import useCartStore from "@/shared/lib/zustand/useCartStore";
import CartItemWithProduct from "./_ui/CardWithProduct";
import EmptyResult from "@/components/EmptyResult";
import usePostPurchaseProductsAll from "@/api/products/client/usePostPurchaseProductsAll";
import { customConfirm } from "@/shared/lib/zustand/useCustomConfirmStroe";

const CartPageContent = () => {
  const { items } = useCartStore();
  const { mutate: postPurchaseProductsAll } = usePostPurchaseProductsAll();

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={6} align="stretch">
        <Flex align="center">
          <Heading size="lg">장바구니</Heading>
          <Spacer />
        </Flex>
        <VStack spacing={4} align="stretch">
          {items.length === 0 ? (
            <EmptyResult text={"장바구니를 추가하세요"} />
          ) : (
            items.map((item) => (
              <CartItemWithProduct
                key={item.productId}
                productId={item.productId}
                quantity={item.quantity}
              />
            ))
          )}
        </VStack>
        <Divider />
        {items.length > 0 && (
          <Flex justify="flex-end">
            <Button
              variant={"toggle"}
              size="lg"
              onClick={() => {
                if (
                  !customConfirm({
                    title: "구매하시겠습니까?",
                    description: "구매한 상품은 환불이 불가능합니다.",
                  })
                )
                  return;
                const productIds = items.map((item) => ({
                  productId: item.productId,
                  quantity: item.quantity,
                }));
                postPurchaseProductsAll(productIds);
              }}>
              구매하기
            </Button>
          </Flex>
        )}
      </VStack>
    </Container>
  );
};
export default CartPageContent;
