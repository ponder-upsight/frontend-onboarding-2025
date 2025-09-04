import { create } from "zustand";

interface ImageModalState {
  isOpen: boolean;
  images: string[];
  currentPosition: number;
  openModal: (images: string[], position?: number) => void;
  closeModal: () => void;
  setPosition: (position: number) => void;
}

const useImageModalStore = create<ImageModalState>((set) => ({
  isOpen: false,
  images: [],
  currentPosition: 0,
  openModal: (images: string[], position = 0) =>
    set({
      isOpen: true,
      images,
      currentPosition: position,
    }),
  closeModal: () =>
    set({
      isOpen: false,
      images: [],
      currentPosition: 0,
    }),
  setPosition: (position: number) => set({ currentPosition: position }),
}));
export default useImageModalStore;
