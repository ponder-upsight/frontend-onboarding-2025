import {
  useController,
  FieldValues,
  FieldPath,
  Control,
} from "react-hook-form";

export type UseImageControllerProps<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  existingImageUrls?: string[];
  deletedImageUrlsFieldName?: FieldPath<T>;
};

const useImageController = <T extends FieldValues = FieldValues>({
  control,
  existingImageUrls = [],
  deletedImageUrlsFieldName,
}: UseImageControllerProps<T>) => {
  const canDeelete = !!deletedImageUrlsFieldName;

  const deletedImagesController = useController<T>({
    name: (deletedImageUrlsFieldName as FieldPath<T>) || ("" as FieldPath<T>),
    control,
    defaultValue: [] as unknown as T[FieldPath<T>],
    disabled: !canDeelete,
  });

  const deletedImageUrls: string[] = canDeelete
    ? (deletedImagesController?.field.value as unknown as string[]) || []
    : [];

  const handleRemoveExistingImage = (url: string) => {
    if (!canDeelete) return;
    deletedImagesController?.field.onChange([...(deletedImageUrls || []), url]);
  };

  // 삭제되지 않은 기존 이미지들만 필터링
  const filteredExistingImages = existingImageUrls.filter(
    (url) => !deletedImageUrls.includes(url)
  );

  return {
    handleRemoveExistingImage,
    filteredExistingImages,
    deletedImageUrls,
    deletedImagesController,
  };
};
export default useImageController;
