import { create } from "zustand";

type ToastStatus = "success" | "error" | "warning" | "info";

interface ToastState {
  isOpen: boolean;
  message: string;
  status: ToastStatus;
  toastTimer?: NodeJS.Timeout;
}

interface ToastActions {
  showToast: (options: {
    message: string;
    status?: ToastStatus;
    duration?: number;
  }) => void;
  hideToast: () => void;
}

const useCustomToastStore = create<ToastState & ToastActions>((set, get) => ({
  isOpen: false,
  message: "",
  status: "info",
  toastTimer: undefined,

  showToast: ({ message, status = "info", duration = 3000 }) => {
    // 이전 타이머가 있다면 초기화
    if (get().toastTimer) {
      clearTimeout(get().toastTimer);
    }

    const timer = setTimeout(() => {
      get().hideToast();
    }, duration);

    set({ isOpen: true, message, status, toastTimer: timer });
  },

  hideToast: () => {
    if (get().toastTimer) {
      clearTimeout(get().toastTimer);
    }
    set({ isOpen: false, message: "", toastTimer: undefined });
  },
}));

export default useCustomToastStore;

export const customToast = (options: {
  message: string;
  status?: ToastStatus;
  duration?: number;
}) => {
  const { showToast } = useCustomToastStore.getState();
  showToast(options);
};
