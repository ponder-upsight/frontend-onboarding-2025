import {
  Controller,
  useFormContext,
  FieldValues,
  FieldPath,
} from "react-hook-form";
import { Box, Input, Text, VStack } from "@chakra-ui/react";
import { useRef } from "react";
import { ACCEPTED_IMAGE_TYPES } from "../schema/constant";
import handleFileChange from "./lib/hadnleFileChange";
import getLabel from "./lib/getLabel";

interface FileUploadProps<T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  multiple?: boolean;
}

const FileUpload = <T extends FieldValues = FieldValues>({
  name,
  multiple = false,
}: FileUploadProps<T>) => {
  const { control } = useFormContext<T>();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value: files } }) => (
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
            <Text color="blue.500" fontWeight="medium">
              {getLabel(files?.length || 0, multiple)}
            </Text>
            {multiple && (
              <Text fontSize="xs" color="gray.500">
                최대 10개까지 선택 가능
              </Text>
            )}
          </VStack>
          <Input
            type="file"
            multiple={multiple}
            hidden
            accept={ACCEPTED_IMAGE_TYPES.join(",")}
            ref={inputRef}
            onChange={(e) =>
              handleFileChange({ event: e, files, multiple, onChange })
            }
          />
        </Box>
      )}
    />
  );
};

export default FileUpload;
