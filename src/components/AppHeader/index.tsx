"use client";

import { Path, startWithPath } from "@/util/path";
import { Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AppHeader = () => {
  const path = usePathname();

  const isProductsList =
    startWithPath(path, Path.PRODUCTS_LIST) || path === Path.ROOT;
  const isProductsAdd = startWithPath(path, Path.PRODUCTS_ADD);

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
        <Link href={"/"}>
          <Button variant={"toggle"} aria-selected={isProductsList} size="md">
            상품 목록
          </Button>
        </Link>
        <Link href={"/products/add"}>
          <Button variant={"toggle"} aria-selected={isProductsAdd} size="md">
            상품 등록
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};
export default AppHeader;
