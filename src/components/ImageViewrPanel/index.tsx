"use client";

import Image from "next/image";
import useImageModalStore from "@/lib/zustand/useImageModalStore";

interface ImageViewrPanelProps {
  imageProps: React.ComponentProps<typeof Image>;
  imageCss?: React.CSSProperties;
  images: string[];
  position?: number;
}

const ImageViewrPanel = ({
  imageProps,
  imageCss,
  images,
  position = 0,
}: ImageViewrPanelProps) => {
  const { openModal } = useImageModalStore();

  const handleClick = () => {
    openModal(images, position);
  };

  return (
    <Image
      {...imageProps}
      onClick={handleClick}
      style={{ ...imageCss, cursor: "pointer" }}
      alt={imageProps.alt || "이미지"}
    />
  );
};

export default ImageViewrPanel;
