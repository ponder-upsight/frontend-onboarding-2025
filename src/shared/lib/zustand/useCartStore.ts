import { create } from "zustand";
import { persist } from "zustand/middleware";

// 장바구니 아이템과 상태에 대한 타입 정의 (실제 프로젝트에 맞게 수정 필요)
interface CartItem {
  productId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  setItemQuantity: (productId: string, quantity: number) => void;
}

const CART_STORAGE_KEY = "cart-storage";

const useCartStore = create(
  persist<CartState>(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.productId === item.productId
          );
          if (existingItem) {
            // 이미 있는 상품이면 수량만 증가
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          // 없는 상품이면 새로 추가
          return { items: [...state.items, item] };
        }),
      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== itemId),
        })),
      clearCart: () => set({ items: [] }),
      setItemQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        })),
    }),
    {
      // localStorage에 저장될 때 사용될 키 이름
      name: CART_STORAGE_KEY,
    }
  )
);

export default useCartStore;
