import { useState } from "react";
import { toast } from "react-toastify";

import { Product } from "@/domain/product/Product";
import { ProductDetails } from "@/domain/product/ProductDetails";
import { CartService } from "@/service/cart/CartService";
import { ProductService } from "@/service/product/ProductService";
import { useModalState } from "@/util/modal/useModalState";

import { SuccessToast } from "@/components/ui/Toast";
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
  const orderProduct = ProductService.useOrderProduct(id);
  const addNewItem = CartService.useAddNewItem();

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
    const product = new Product(
      id,
      productDetails.name,
      productDetails.stockQuantity,
      productDetails.thumbnailUrl
    );

    addNewItem(product.id!, stockQuantity);

    toast(SuccessToast, {
      data: {
        title: t("addToCartSuccess", {
          name: productDetails.name,
          quantity: stockQuantity,
        }),
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
