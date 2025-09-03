import { Control, useWatch } from "react-hook-form";
import {
  Box,
  Image,
  FormControl,
  FormLabel,
  FormErrorMessage,
  SimpleGrid,
  CloseButton,
} from "@chakra-ui/react";
import { ProductFormValues } from "@/lib/react-hook-form/schema";
import FileUpload from "@/lib/react-hook-form/FileUpload";
import { useState, useEffect } from "react";

interface ImagePreviewProps {
  control: Control<ProductFormValues>;
  name: "thumbnail" | "detail";
  label: string;
  error?: string;
  multiple?: boolean;
  onRemoveFile?: (index: number) => void;
  onRemoveAllFiles?: () => void;
}

const ImagePreview = ({
  control,
  name,
  label,
  error,
  multiple = false,
}: ImagePreviewProps) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const watchedFiles = useWatch({ control, name });

  useEffect(() => {
    if (watchedFiles && watchedFiles.length > 0) {
      const objectUrls = Array.from(watchedFiles).map((file) =>
        URL.createObjectURL(file as File)
      );
      setPreviews(objectUrls);

      return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
    } else {
      setPreviews([]);
    }
  }, [watchedFiles]);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel fontSize="sm">{label}</FormLabel>
      {previews.length === 0 ? (
        <FileUpload name={name} control={control} multiple={multiple} />
      ) : multiple ? (
        <Box>
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={4} mb={2}>
            {previews.map((src, index) => (
              <Box key={index} position="relative">
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
                  onClick={() => {
                    // 이미지 삭제 로직을 부모 컴포넌트에서 처리하도록 콜백 전달
                    console.log(`Remove image at index ${index}`);
                  }}
                />
              </Box>
            ))}
          </SimpleGrid>
          <FileUpload name={name} control={control} multiple={multiple} />
        </Box>
      ) : (
        <Box>
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
              onClick={() => {
                // 단일 이미지 삭제 로직을 부모 컴포넌트에서 처리하도록 콜백 전달
                console.log("Remove single image");
              }}
            />
          </Box>
          <FileUpload name={name} control={control} multiple={multiple} />
        </Box>
      )}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default ImagePreview;
