import { useEffect, useState } from "react";

interface UseImageLoadingHandlerProps {
  images: string[];
  currentPosition: number;
}

interface UseImageLoadingHandlerReturn {
  isImageLoading: boolean;
  handleSetIsImageLoading: (loading: boolean) => void;
}

const useImageLoadingHandler = ({
  images,
  currentPosition,
}: UseImageLoadingHandlerProps): UseImageLoadingHandlerReturn => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleSetIsImageLoading = (loading: boolean) => {
    setIsImageLoading(loading);
  };

  // 현재 위치가 변경될 때마다 로딩 상태 초기화
  useEffect(() => {
    if (images && images[currentPosition]) {
      setIsImageLoading(true);
    }
  }, [currentPosition, images]);

  return {
    isImageLoading,
    handleSetIsImageLoading,
  };
};

export default useImageLoadingHandler;
