"use client";

import useCartStore from "@/lib/zustand/useCartStore";
import { Path, startWithPath } from "@/util/path";
import { Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AppHeader = () => {
  const path = usePathname();
  const { items } = useCartStore();

  const isProductsList =
    startWithPath(path, Path.PRODUCTS_LIST) || path === Path.ROOT;
  const isProductsAdd = startWithPath(path, Path.PRODUCT_ADD);
  const isCartPage = startWithPath(path, "/cart");

  return (
    <Flex
      w="100%"
      as="header"
      align="center"
      justify="space-between"
      p={4}
      borderBottom="2px solid"
      borderColor="primary.500">
      <Heading fontSize="2xl" fontWeight={400} color={"primary.500"}>
        상품 관리 시스템
      </Heading>
      <Flex gap={2}>
        <Link href={Path.ROOT}>
          <Button variant={"toggle"} aria-selected={isProductsList} size="md">
            상품 목록
          </Button>
        </Link>
        <Link href={Path.PRODUCT_ADD}>
          <Button variant={"toggle"} aria-selected={isProductsAdd} size="md">
            상품 등록
          </Button>
        </Link>
        <Button
          aria-selected={isCartPage}
          as={Link}
          href={Path.CART}
          variant="toggle"
          size="md">
          장바구니 ({items.length})
        </Button>
      </Flex>
    </Flex>
  );
};
export default AppHeader;
