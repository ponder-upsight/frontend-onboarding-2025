import { create } from "zustand";

type CustomConfirmState = {
  isOpen: boolean;
  title: string;
  description: string;
  resolver?: (value: boolean) => void;
};

type CustomConfirmActions = {
  openConfirm: (title: string, description: string) => Promise<boolean>;
  closeConfirm: (result: boolean) => void;
};

const useCustomConfirmStore = create<CustomConfirmState & CustomConfirmActions>(
  (set, get) => ({
    isOpen: false,
    title: "",
    description: "",
    resolver: undefined,

    openConfirm: (title: string, description: string) => {
      return new Promise<boolean>((resolve) => {
        set({
          isOpen: true,
          title,
          description,
          resolver: resolve,
        });
      });
    },

    closeConfirm: (result: boolean) => {
      const { resolver } = get();
      if (resolver) {
        resolver(result);
      }
      set({
        isOpen: false,
        title: "",
        description: "",
        resolver: undefined,
      });
    },
  })
);

export const customConfirm = async (options: {
  title?: string;
  description?: string;
}) => {
  const { openConfirm } = useCustomConfirmStore.getState();
  return await openConfirm(
    options.title || "Confirm",
    options.description || "Are you sure?"
  );
};

export default useCustomConfirmStore;
