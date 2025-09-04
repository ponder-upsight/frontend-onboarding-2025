import useCartStore from "@/shared/lib/zustand/useCartStore";
import { ProductDetailItem } from "@/shared/types/products";
import { useEffect, useRef, useState } from "react";

interface UseCartCountProps {
  product: ProductDetailItem | undefined;
  quantity: number;
  productId: string;
}

interface UseCartCountReturn {
  count: number;
  handleIncrease: () => void;
  handleDecrease: () => void;
  handleRemove: () => void;
}

const useCartCount = ({
  product,
  quantity,
  productId,
}: UseCartCountProps): UseCartCountReturn => {
  const { removeItem, setItemQuantity } = useCartStore();
  const [count, setCount] = useState<number>(quantity);
  const countRef = useRef(count);

  const handleIncrease = () => {
    if (product && count > product.stock) {
      alert("재고가 부족합니다.");
      return;
    }
    setCount((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (count <= 1) {
      removeItem(productId);
      return;
    }
    setCount((prev) => prev - 1);
  };

  const handleRemove = () => {
    removeItem(productId);
  };

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  useEffect(() => {
    return () => {
      setItemQuantity(productId, countRef.current);
    };
  }, []);
  return {
    count,
    handleIncrease,
    handleDecrease,
    handleRemove,
  };
};

export default useCartCount;
