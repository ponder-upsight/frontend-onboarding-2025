import { toast } from "react-toastify";

import { ErrorToast } from "../components/ErrorToast";
import { ShakingErrorToast } from "../components/ShakingErrorToast";

interface ServerError {
  errorCode?: string;
  errorName?: string;
  message: string;
  requestId?: string | null;
  status?: string;
  statusCode?: number;
  timestamp?: string;
}

export const showErrorToast = (errors: ServerError) => {
  const toastId = "error-toast";
  const { message = "알 수 없는 오류가 발생했습니다.", requestId = "" } = errors;

  if (toast.isActive(toastId)) {
    // 이미 떠 있으면 ShakingErrorToast 업데이트
    toast.update(toastId, {
      render: ShakingErrorToast,
      data: { title: message, requestId },
    });
  } else {
    // 처음이면 일반 ErrorToast로 표시
    toast(ErrorToast, {
      toastId,
      data: { title: message, requestId },
      position: "bottom-center",
      autoClose: 3000,
    });
  }
};
