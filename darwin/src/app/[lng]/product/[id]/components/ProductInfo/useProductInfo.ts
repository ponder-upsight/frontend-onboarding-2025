import { useState } from "react";
import { toast } from "react-toastify";

import { ProductDetails } from "@/domain/product/ProductDetails";
import { useProduct } from "@/domain/product/useProduct";
import { useModalState } from "@/util/modal/useModalState";

import { SuccessToast } from "@/app/components/ui/Toast";
import { useI18n } from "@/app/i18n/I18nProvider";

export const useProductInfo = ({
  id,
  productDetails,
}: {
  id: string;
  productDetails: ProductDetails;
}) => {
  const { t } = useI18n();
  const [stockQuantity, setStockQuantity] = useState(1);
  const orderConfirmModalState = useModalState();
  const { useOrderProduct } = useProduct();
  const orderProduct = useOrderProduct(id);

  const handleQuantityChange = (change: number) => {
    const newQuantity = stockQuantity + change;
    if (newQuantity >= 1 && newQuantity <= productDetails.stockQuantity) {
      setStockQuantity(newQuantity);
    }
  };

  const handleOrder = () => {
    orderConfirmModalState.openModal(handleOrderConfirm);
  };

  const handleOrderConfirm = async () => {
    await orderProduct.mutateAsync({ stockQuantity });
    setTimeout(() => {
      toast(SuccessToast, {
        data: { title: t("orderComplete") },
        position: "top-center",
        autoClose: 3000,
      });
    }, 0);
  };

  const handleAddToCart = () => {
    toast(SuccessToast, {
      data: {
        title: t("addToCartSuccess", { name: productDetails.name, stockQuantity }),
      },
      position: "top-center",
      autoClose: 3000,
    });
  };

  return {
    orderConfirmModalState,
    handleQuantityChange,
    handleOrder,
    handleAddToCart,
    stockQuantity,
  };
};
