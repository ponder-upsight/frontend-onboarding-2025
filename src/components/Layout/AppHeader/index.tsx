"use client";

import useCartStore from "@/shared/lib/zustand/useCartStore";
import { NAV_BARS, Path, isRouteActive } from "@/shared/utils/pathUtil";
import { Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AppHeader = () => {
  const path = usePathname();
  const { items } = useCartStore();

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
        <Link href={Path.ROOT}>상품 관리 시스템</Link>
      </Heading>

      <Flex gap={2}>
        {NAV_BARS.map((nav) => (
          <Link key={nav.path} href={nav.path}>
            <Button
              variant={"toggle"}
              aria-selected={isRouteActive(path, nav.path)}
              size="md">
              {/* 장바구니는 item 개수를 사용 */}
              {nav.path === Path.CART ? `장바구니(${items.length})` : nav.label}
            </Button>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};
export default AppHeader;
