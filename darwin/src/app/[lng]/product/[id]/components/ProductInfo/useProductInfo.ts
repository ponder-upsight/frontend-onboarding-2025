import { useState } from "react";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

import { SuccessToast } from "@/app/components/ui/Toast";
import { useI18n } from "@/app/i18n/I18nProvider";

import { useModalStore } from "@/store/useModalStore";
import {ProductDetails} from "@/domain/product/ProductDetails";
import {useProduct} from "@/domain/product/useProduct";

export const useProductInfo = ({
  id,
  productDetails,
}: {
  id: string;
  productDetails: ProductDetails;
}) => {
  const { t, lng } = useI18n();
  const router = useRouter();
  const [stockQuantity, setStockQuantity] = useState(1);
  const orderConfirmModalStore = useModalStore();
  const { useOrderProduct } = useProduct()
  const orderProduct = useOrderProduct(id);

  const handleQuantityChange = (change: number) => {
    const newQuantity = stockQuantity + change;
    if (newQuantity >= 1 && newQuantity <= productDetails.stockQuantity) {
      setStockQuantity(newQuantity);
    }
  };

  const handleOrder = () => {
    orderConfirmModalStore.openModal(handleOrderConfirm);
  };

  const handleOrderConfirm = async () => {
    await orderProduct.mutate({ stockQuantity });
    toast(SuccessToast, {
      data: { title: t("orderComplete") },
      position: "top-center",
      autoClose: 3000,
    });
    router.push(`/${lng}`);
  };

  const handleAddToCart = () => {
    toast(SuccessToast, {
      data: { title: t("addToCartSuccess", { name: productDetails.name, stockQuantity }) },
      position: "top-center",
      autoClose: 3000,
    });
  };

  return {
    orderConfirmModalStore,
    handleQuantityChange,
    handleOrder,
    handleAddToCart,
    stockQuantity,
  };
};
