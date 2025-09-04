type RemoveNewImageProps = {
  indexToRemove: number;
  files: FileList | undefined;
  onChange: (files: FileList | undefined) => void;
};

// 새로 선택한 이미지 삭제 함수
export const removeNewImage = ({
  indexToRemove,
  files,
  onChange,
}: RemoveNewImageProps) => {
  if (!files || files.length === 0) return;

  const filesArray = Array.from(files);
  const newFiles = filesArray.filter((_, index) => index !== indexToRemove);

  if (newFiles.length === 0) {
    onChange(undefined);
  } else {
    const dataTransfer = new DataTransfer();
    newFiles.forEach((file) => dataTransfer.items.add(file));
    onChange(dataTransfer.files);
  }
};

type RemoveAllNewImagesProps = {
  onChange: (files: FileList | undefined) => void;
};

// 단일 이미지 전체 삭제 함수
export const removeAllNewImages = ({ onChange }: RemoveAllNewImagesProps) => {
  onChange(undefined);
};
