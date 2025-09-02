import { Controller, Control } from "react-hook-form";
import { Box, Input, Text, VStack, Icon } from "@chakra-ui/react";
import { useRef } from "react";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/react-hook-form/schema";
import { ProductFormValues } from "@/lib/react-hook-form/schema";

interface FileUploadProps {
  name: "thumbnail" | "detailImages";
  control: Control<ProductFormValues>;
  multiple?: boolean;
}

const FileUpload = ({ name, control, multiple = false }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        const fileCount = value?.length || 0;
        const label = multiple ? "추가" : "이미지 추가";
        return (
          <Box
            border="2px dashed"
            borderColor="gray.300"
            borderRadius="md"
            p={6}
            textAlign="center"
            cursor="pointer"
            onClick={() => inputRef.current?.click()}
            _hover={{ borderColor: "blue.500" }}>
            <VStack>
              <Icon boxSize={8} color="gray.500" />
              <Text color="blue.500" fontWeight="medium">
                {fileCount > 0 ? `${fileCount}개의 파일 선택됨` : label}
              </Text>
            </VStack>
            <Input
              type="file"
              multiple={multiple}
              hidden
              accept={ACCEPTED_IMAGE_TYPES.join(",")}
              ref={inputRef}
              onChange={(e) => onChange(e.target.files)}
            />
          </Box>
        );
      }}
    />
  );
};

export default FileUpload;
