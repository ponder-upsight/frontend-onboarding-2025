import { CartItem } from "@/domain/cart/CartItem";
import { create } from "zustand/react";

interface CartState {
  items: CartItem[];
  actions: {
    addNewItem: (productId: string, quantity: number) => void;
    clear: () => void;
  };
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  actions: {
    addNewItem: (productId, quantity) => {
      set((state) => {
        const newItem = new CartItem(productId, quantity);
        const existingItemIndex = state.items.findIndex((item) => item.isEqual(newItem));

        if (existingItemIndex >= 0) {
          const updatedItems = state.items.slice();
          updatedItems[existingItemIndex].addQuantity(quantity);
          return {
            items: updatedItems,
          };
        }

        return {
          items: [...state.items, newItem],
        };
      });
    },
    clear: () => {
      set({
        items: [],
      });
    },
  },
}));
