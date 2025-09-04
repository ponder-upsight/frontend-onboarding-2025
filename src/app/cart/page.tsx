"use client";

import {
  Container,
  Heading,
  VStack,
  Divider,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import useCartStore from "@/lib/zustand/useCartStore";
import CartItemWithProduct from "./_ui/CardWithProduct";
import EmptyResult from "@/components/EmptyResult";

const CartPage = () => {
  const { items } = useCartStore();

  if (items.length === 0) {
    <EmptyResult
      heading="장바구니가 비어있습니다"
      text={"장바구니를 추가하세요"}
    />;
  }

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={6} align="stretch">
        <Flex align="center">
          <Heading size="lg">장바구니</Heading>
          <Spacer />
        </Flex>
        <VStack spacing={4} align="stretch">
          {items.map((item) => (
            <CartItemWithProduct
              key={item.productId}
              productId={item.productId}
              quantity={item.quantity}
            />
          ))}
        </VStack>
        <Divider />
      </VStack>
    </Container>
  );
};

export default CartPage;
