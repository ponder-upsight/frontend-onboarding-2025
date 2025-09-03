import { Controller, useController, useFormContext } from "react-hook-form";
import {
  Box,
  Image,
  FormControl,
  FormLabel,
  FormErrorMessage,
  SimpleGrid,
  CloseButton,
  Text,
} from "@chakra-ui/react";
import {
  ProductFormValues,
  ProductModifyFormValues,
} from "@/lib/react-hook-form/schema";
import FileUpload from "@/lib/react-hook-form/FileUpload";

// 공통 폼 타입 (생성용과 수정용 모두 지원)
type CommonFormType = ProductFormValues | ProductModifyFormValues;

interface ImagePreviewProps {
  name: string;
  label: string;
  multiple?: boolean;
  existingImageUrls?: string[]; // 기존 이미지 URL들
  deletedImageUrlsFieldName?: "deletedImageUrls"; // 삭제된 이미지 URL들 필드명 (수정 모드에서만 사용)
}

const ImagePreview = ({
  name,
  label,
  multiple = false,
  existingImageUrls = [],
  deletedImageUrlsFieldName,
}: ImagePreviewProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CommonFormType>();

  // React Hook 조건부 호출 문제 해결: 항상 호출하되 필요할 때만 사용
  const deletedImagesController = useController({
    name: (deletedImageUrlsFieldName ||
      "deletedImageUrls") as "deletedImageUrls",
    control,
    defaultValue: [],
  });

  const deletedImageUrls = deletedImageUrlsFieldName
    ? deletedImagesController.field.value || []
    : [];

  const setDeletedImageUrls = deletedImageUrlsFieldName
    ? deletedImagesController.field.onChange
    : null;

  const handleRemoveExistingImage = (url: string) => {
    if (setDeletedImageUrls) {
      setDeletedImageUrls([...deletedImageUrls, url]);
    }
  };

  // 삭제되지 않은 기존 이미지들만 필터링
  const filteredExistingImages = existingImageUrls.filter(
    (url) => !deletedImageUrls.includes(url)
  );

  const error = errors[name]?.message as string;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        const files = value as FileList | undefined;

        // 새로 선택한 이미지 삭제 함수
        const removeNewImage = (indexToRemove: number) => {
          if (!files || files.length === 0) return;

          const filesArray = Array.from(files);
          const newFiles = filesArray.filter(
            (_, index) => index !== indexToRemove
          );

          if (newFiles.length === 0) {
            onChange(undefined);
          } else {
            const dataTransfer = new DataTransfer();
            newFiles.forEach((file) => dataTransfer.items.add(file));
            onChange(dataTransfer.files);
          }
        };

        // 단일 이미지 전체 삭제 함수
        const removeAllNewImages = () => {
          onChange(undefined);
        };

        // 미리보기 URL 생성
        const previews =
          files && files.length > 0
            ? Array.from(files).map((file) => URL.createObjectURL(file as File))
            : [];

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
                      <Box key={`existing-${index}`} position="relative">
                        <Image
                          src={url}
                          alt={`현재 ${label} ${index}`}
                          borderRadius="md"
                          boxSize="150px"
                          objectFit="cover"
                        />
                        {deletedImageUrlsFieldName && (
                          <CloseButton
                            position="absolute"
                            top="2"
                            right="2"
                            size="sm"
                            bg="red.500"
                            color="white"
                            _hover={{ bg: "red.600" }}
                            onClick={() => handleRemoveExistingImage(url)}
                          />
                        )}
                      </Box>
                    ))}
                  </SimpleGrid>
                ) : (
                  <Box position="relative" display="inline-block" mb={2}>
                    <Image
                      src={filteredExistingImages[0]}
                      alt={`현재 ${label}`}
                      borderRadius="md"
                      boxSize="150px"
                      objectFit="cover"
                    />
                    {deletedImageUrlsFieldName && (
                      <CloseButton
                        position="absolute"
                        top="2"
                        right="2"
                        size="sm"
                        bg="red.500"
                        color="white"
                        _hover={{ bg: "red.600" }}
                        onClick={() =>
                          handleRemoveExistingImage(filteredExistingImages[0])
                        }
                      />
                    )}
                  </Box>
                )}
              </Box>
            )}

            {/* 새로 선택한 이미지들 표시 */}
            {previews.length === 0 ? (
              <FileUpload name={name} multiple={multiple} />
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
                    <Box key={`new-${index}`} position="relative">
                      <Image
                        src={src}
                        alt={`${label} preview ${index}`}
                        borderRadius="md"
                        boxSize="150px"
                        objectFit="cover"
                      />
                      <CloseButton
                        position="absolute"
                        top="2"
                        right="2"
                        size="sm"
                        bg="red.500"
                        color="white"
                        _hover={{ bg: "red.600" }}
                        onClick={() => removeNewImage(index)}
                      />
                    </Box>
                  ))}
                </SimpleGrid>
                <FileUpload name={name} multiple={multiple} />
              </Box>
            ) : (
              <Box>
                <Text fontSize="sm" color="gray.600" mb={2}>
                  새로 선택한 이미지:
                </Text>
                <Box position="relative" display="inline-block">
                  <Image
                    src={previews[0]}
                    alt={`${label} preview`}
                    borderRadius="md"
                    boxSize="150px"
                    objectFit="cover"
                    mb={2}
                  />
                  <CloseButton
                    position="absolute"
                    top="2"
                    right="2"
                    size="sm"
                    bg="red.500"
                    color="white"
                    _hover={{ bg: "red.600" }}
                    onClick={removeAllNewImages}
                  />
                </Box>
                <FileUpload name={name} multiple={multiple} />
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
