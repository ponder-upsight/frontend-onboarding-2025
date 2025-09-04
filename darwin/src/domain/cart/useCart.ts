import { useCartStore } from "@/store/cart/cart";

export const useCart = () => {
  const cartStore = useCartStore();

  const addNewItem = (productId: string, quantity: number) => {
    cartStore.addNewItem(productId, quantity);
  };

  const getItems = () => {
    return cartStore.items;
  };

  return {
    addNewItem,
    items: getItems(),
  };
};
