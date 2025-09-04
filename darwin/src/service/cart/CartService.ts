import { useCartStore } from "@/store/cart/cart";

const useAddNewItem = () => {
  const { addNewItem } = useCartStore((state) => state.actions);

  return (productId: string, quantity: number) => {
    addNewItem(productId, quantity);
  };
};

const useClear = () => {
  const { clear } = useCartStore((state) => state.actions);

  return () => {
    clear();
  };
};

const useCartItems = () => {
  const items = useCartStore((state) => state.items);

  return items;
};

export const CartService = {
  useAddNewItem,
  useClear,
  useCartItems,
};
