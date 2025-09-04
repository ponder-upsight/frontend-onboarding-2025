import { useState } from "react";

export const useModalState = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [onConfirm, setOnConfirm] = useState<() => void>(() => () => {});

  const openModal = (onConfirm: () => void) => {
    setIsOpen(true);
    setOnConfirm(() => onConfirm);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    onConfirm,
    openModal,
    closeModal,
  };
};
