import { toast } from "react-toastify";

import { SuccessToast } from "@/app/components/ui/Toast";
import { useI18n } from "@/app/i18n/I18nProvider";

import { useModalStore } from "@/store/useModalStore";
import {Product} from "@/domain/product/Product";

export const useProductCard = ({
  product,
  onDeleteClick,
}: {
  product: Product;
  onDetailClick: (product: Product) => void;
  onDeleteClick: (product: Product) => void;
}) => {
  const { t } = useI18n();
  const deleteConfirmModalStore = useModalStore();

  const handleDelete = () => {
    deleteConfirmModalStore.openModal(() => handleDeleteConfirm());
  };

  const handleDeleteConfirm = () => {
    onDeleteClick(product);

    toast(SuccessToast, {
      data: { title: t("deleteProductSuccess") },
      position: "top-center",
      autoClose: 3000,
    });
  };

  return { deleteConfirmModalStore, handleDelete };
};
