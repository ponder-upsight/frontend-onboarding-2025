export const Path = {
  ROOT: `/`,
  PRODUCT_DETAIL: `/product`,
  PRODUCT_ADD: "/product/add",
  CART: "/cart",
};

export const NAV_BARS = [
  {
    path: Path.ROOT,
    label: "상품목록",
  },
  {
    path: Path.PRODUCT_ADD,
    label: "상품등록",
  },
  {
    path: Path.CART,
    label: "장바구니",
  },
];

export const isRouteActive = (
  pathname: string | null,
  route: string
): boolean => {
  const isActive = pathname === route || pathname?.startsWith(route + "/");
  return isActive ? true : false;
};
