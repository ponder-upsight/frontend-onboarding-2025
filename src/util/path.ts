export const Path = {
  PRODUCTS_LIST: "/",
  PRODUCTS_ADD: "/products/add",
  PRODUCTS_DETAIL: (id: string | number) => `/products/${id}`,
};
