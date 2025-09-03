import {useState} from "react";
import {useModalStore} from "@/store/useModalStore";
import {useOrderProduct} from "@/api/product/orderProduct";
import {toast} from "react-toastify";
import {SuccessToast} from "@/app/components/ui/Toast";
import {useRouter} from "next/navigation";
import {useI18n} from "@/app/i18n/I18nProvider";
import {ProductDetails} from "@/api/product/getProduct";

export const useProductInfo = ({
  id,
  productDetails,
}: {
  id: string;
  productDetails: ProductDetails;
}) => {
  const { t, lng } = useI18n()
  const router = useRouter();
  const [ quantity, setQuantity ] = useState(1);
  const orderConfirmModalStore = useModalStore();
  const { mutate } = useOrderProduct(id);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= productDetails.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleOrder = () => {
    orderConfirmModalStore.openModal(handleOrderConfirm);
  };

  const handleOrderConfirm = async () => {
    await mutate({ quantity });
    toast(SuccessToast, {
      data: { title: t("orderComplete") },
      position: "top-center",
      autoClose: 3000,
    });
    router.push(`/${lng}`);
  };

  const handleAddToCart = () => {
    toast(SuccessToast, {
      data: { title: t("addToCartSuccess", { name: productDetails.name, quantity }) },
      position: "top-center",
      autoClose: 3000,
    });
  };

  return {
    orderConfirmModalStore,
    handleQuantityChange,
    handleOrder,
    handleAddToCart,
    quantity,
  }
}
