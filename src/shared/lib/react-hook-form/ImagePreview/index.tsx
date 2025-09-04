import {
  Controller,
  useFormContext,
  FieldValues,
  FieldPath,
} from "react-hook-form";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import FileUpload from "@/shared/lib/react-hook-form/FileUpload";
import { removeAllNewImages, removeNewImage } from "./lib/imageUplaodUtil";
import getPreviewImages from "./lib/getPreviewImages";
import useImageController from "./hooks/useImageController";
import PreviewImageBox from "./ui/PreviewImageBox";

interface ImagePreviewProps<T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  label: string;
  multiple?: boolean;
  existingImageUrls?: string[];
  deletedImageUrlsFieldName?: FieldPath<T>;
}

const ImagePreview = <T extends FieldValues = FieldValues>({
  name,
  label,
  multiple = false,
  existingImageUrls = [],
  deletedImageUrlsFieldName,
}: ImagePreviewProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name]?.message as string | undefined;

  const { filteredExistingImages, handleRemoveExistingImage } =
    useImageController<T>({
      control,
      existingImageUrls,
      deletedImageUrlsFieldName,
    });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value: files } }) => {
        const previews = getPreviewImages(files);
        return (
          <FormControl isInvalid={!!error}>
            <FormLabel fontSize="sm">{label}</FormLabel>
            {/* 기존 이미지들 표시 */}
            {filteredExistingImages.length > 0 && (
              <Box mb={4}>
                <Text fontSize="sm" color="gray.600" mb={2}>
                  현재 이미지:
                </Text>
                {multiple ? (
                  <SimpleGrid
                    columns={{ base: 2, sm: 3, md: 4 }}
                    spacing={4}
                    mb={2}>
                    {filteredExistingImages.map((url, index) => (
                      <PreviewImageBox
                        key={`existing-preview-${index}`}
                        src={url}
                        alt={`현재 ${label} ${index}`}
                        onRemove={
                          deletedImageUrlsFieldName
                            ? () => handleRemoveExistingImage(url)
                            : undefined
                        }
                      />
                    ))}
                  </SimpleGrid>
                ) : (
                  <PreviewImageBox
                    src={filteredExistingImages[0]}
                    alt={`현재 ${label}`}
                    onRemove={
                      deletedImageUrlsFieldName
                        ? () =>
                            handleRemoveExistingImage(filteredExistingImages[0])
                        : undefined
                    }
                  />
                )}
              </Box>
            )}

            {/* 새로 선택한 이미지들 표시 */}
            {previews.length === 0 ? (
              <FileUpload<T> name={name} multiple={multiple} />
            ) : multiple ? (
              <Box>
                <Text fontSize="sm" color="gray.600" mb={2}>
                  새로 선택한 이미지:
                </Text>
                <SimpleGrid
                  columns={{ base: 2, sm: 3, md: 4 }}
                  spacing={4}
                  mb={2}>
                  {previews.map((src, index) => (
                    <PreviewImageBox
                      key={`preview-${index}`}
                      src={src}
                      alt={`${label} preview ${index}`}
                      onRemove={() =>
                        removeNewImage({
                          indexToRemove: index,
                          files,
                          onChange,
                        })
                      }
                    />
                  ))}
                </SimpleGrid>
                <FileUpload<T> name={name} multiple={multiple} />
              </Box>
            ) : (
              <Box>
                <Text fontSize="sm" color="gray.600" mb={2}>
                  새로 선택한 이미지:
                </Text>
                <PreviewImageBox
                  src={previews[0]}
                  alt={`${label} preview`}
                  onRemove={() =>
                    removeAllNewImages({
                      onChange,
                    })
                  }
                />
                <FileUpload<T> name={name} multiple={multiple} />
              </Box>
            )}
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
        );
      }}
    />
  );
};

export default ImagePreview;
