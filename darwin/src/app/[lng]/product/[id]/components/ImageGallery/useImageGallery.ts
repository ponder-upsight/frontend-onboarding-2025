import { useState } from "react";

export const useImageGallery = ({
  images,
}: {
  images: {
    url: string;
    name: string;
  }[];
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const changeCurrentImage = (index: number) => {
    setSelectedImageIndex(index);
  };

  return {
    currentImage: images[selectedImageIndex],
    changeCurrentImage,
  };
};
