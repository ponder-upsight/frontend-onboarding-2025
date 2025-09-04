export const Path = {
  ROOT: `/`,
  PRODUCT_DETAIL: `/product`,
  PRODUCT_ADD: "/product/add",
  CART: "/cart",
};

export const startWithPath = (currentPath: string, targetPath: string) => {
  return currentPath.startsWith(targetPath);
};

export const NAV_BARS = [
  {
    path: Path.ROOT,
    label: "상품 목록",
  },
  {
    path: Path.PRODUCT_ADD,
    label: "상품 구매",
  },
  {
    path: Path.CART,
    label: "장바구니",
  },
];
