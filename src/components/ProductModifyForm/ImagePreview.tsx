import { Control, useWatch } from "react-hook-form";
import {
  Box,
  Image,
  FormControl,
  FormLabel,
  FormErrorMessage,
  SimpleGrid,
} from "@chakra-ui/react";
import { ProductFormValues } from "@/lib/react-hook-form/schema";
import FileUpload from "@/lib/react-hook-form/FileUpload";
import { useState, useEffect } from "react";

interface ImagePreviewProps {
  control: Control<ProductFormValues>;
  name: "thumbnail" | "detailImages";
  label: string;
  error?: string;
  multiple?: boolean;
  maxImages?: number;
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
      if (multiple) {
        // 다중 이미지의 경우
        const objectUrls = Array.from(watchedFiles).map((file) =>
          URL.createObjectURL(file)
        );
        setPreviews(objectUrls);
        return () => objectUrls.forEach((url) => URL.revokeObjectURL(url));
      } else {
        // 단일 이미지의 경우
        const file = watchedFiles[0];
        const objectUrl = URL.createObjectURL(file);
        setPreviews([objectUrl]);
        return () => URL.revokeObjectURL(objectUrl);
      }
    } else {
      setPreviews([]);
    }
  }, [watchedFiles, multiple]);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel fontSize="sm">{label}</FormLabel>
      {previews.length === 0 ? (
        <FileUpload name={name} control={control} multiple={multiple} />
      ) : multiple ? (
        <Box>
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} spacing={4} mb={2}>
            {previews.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`${label} preview ${index}`}
                borderRadius="md"
                boxSize="150px"
                objectFit="cover"
              />
            ))}
          </SimpleGrid>
          <FileUpload name={name} control={control} multiple={multiple} />
        </Box>
      ) : (
        <Box>
          <Image
            src={previews[0]}
            alt={`${label} preview`}
            borderRadius="md"
            boxSize="150px"
            objectFit="cover"
            mb={2}
          />
          <FileUpload name={name} control={control} multiple={multiple} />
        </Box>
      )}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default ImagePreview;
