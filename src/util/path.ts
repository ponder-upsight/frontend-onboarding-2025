export const Path = {
  ROOT: `/`,
  PRODUCTS_LIST: `/product-list`,
  PRODUCT_DETAIL: `/product`,
  PRODUCT_ADD: "/product/add",
};

export const startWithPath = (currentPath: string, targetPath: string) => {
  return currentPath.startsWith(targetPath);
};
