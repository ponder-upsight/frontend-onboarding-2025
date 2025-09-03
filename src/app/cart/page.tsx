"use client";

import {
  Container,
  Heading,
  VStack,
  Divider,
  Alert,
  AlertIcon,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import useCartStore from "@/lib/zustand/useCartStore";
import CartItemWithProduct from "./_ui/CardWithProduct";

const CartPage = () => {
  const { items } = useCartStore();

  if (items.length === 0) {
    return (
      <Container maxW="container.lg" py={8}>
        <VStack spacing={8}>
          <Heading size="lg">장바구니</Heading>
          <Alert status="info">
            <AlertIcon />
            장바구니가 비어있습니다.
          </Alert>
        </VStack>
      </Container>
    );
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
