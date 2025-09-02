export const Path = {
  ROOT: `/`,
  PRODUCTS_LIST: `/product-list`,
  PRODUCTS_DETAIL: `/products`,
  PRODUCTS_ADD: "/products/add",
};

export const startWithPath = (currentPath: string, targetPath: string) => {
  return currentPath.startsWith(targetPath);
};
