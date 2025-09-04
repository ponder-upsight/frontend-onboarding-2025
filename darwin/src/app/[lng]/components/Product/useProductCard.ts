import { toast } from "react-toastify";

import { Product } from "@/domain/product/Product";
import { useModalState } from "@/util/modal/useModalState";

import { SuccessToast } from "@/components/ui/Toast";
import { useI18n } from "@/app/i18n/I18nProvider";

export const useProductCard = ({
  product,
  onDeleteClick,
}: {
  product: Product;
  onDetailClick: (product: Product) => void;
  onDeleteClick: (product: Product) => void;
}) => {
  const { t } = useI18n();
  const deleteConfirmModalState = useModalState();

  const handleDelete = () => {
    deleteConfirmModalState.openModal(() => handleDeleteConfirm());
  };

  const handleDeleteConfirm = () => {
    onDeleteClick(product);

    setTimeout(() => {
      toast(SuccessToast, {
        data: { title: t("deleteProductSuccess") },
        position: "top-center",
        autoClose: 3000,
      });
    }, 0);
  };

  return { deleteConfirmModalStore: deleteConfirmModalState, handleDelete };
};
