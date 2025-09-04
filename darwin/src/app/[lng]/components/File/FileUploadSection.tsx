"use client";

/** @jsxImportSource @emotion/react */
import { useRef } from "react";

import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { IconButton } from "@/components/ui/IconButton";
import { TypoGraph } from "@/components/ui/Typography";

import { useFileUploadSection } from "@/app/[lng]/components/File/useFileUploadSection";
import { useI18n } from "@/app/i18n/I18nProvider";

import { DeleteSmallGray, UploadBlue } from "@/assets/icons";

interface FileUploadSectionProps {
  title: string;
  buttonText: string;
  onFileChange: (files: File[]) => void;
  onFileRemove?: (index: number) => void;
  multiple?: boolean;
  hasError?: boolean;
  errorText?: string;
}

const FileUploadSection = ({
  title,
  buttonText,
  onFileChange,
  onFileRemove,
  multiple = false,
  hasError = false,
  errorText = "",
}: FileUploadSectionProps) => {
  const { t } = useI18n();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    isDragOver,
    selectedFiles,
    handleClick,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleRemoveFile,
    handleFileSelect,
    createImagePreview,
  } = useFileUploadSection({
    fileInputRef,
    onFileChange,
    onFileRemove,
    multiple,
  });

  const renderFilePreview = () => {
    if (selectedFiles.length === 0) {
      return (
        <Box
          css={uploadContainer(isDragOver, hasError)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <Flex direction="column" align="center" justify="center" h="120px" gap="8px">
            <UploadBlue />
            <TypoGraph variant="label01" color="blue.700">
              {buttonText}
            </TypoGraph>
          </Flex>
        </Box>
      );
    }

    if (!multiple && selectedFiles.length === 1) {
      return (
        <Box position="relative">
          <Box
            css={imagePreviewContainer}
            backgroundImage={`url(${createImagePreview(selectedFiles[0])})`}
            backgroundSize="cover"
            backgroundPosition="center"
            h="120px"
            borderRadius="8px"
          >
            <IconButton
              position="absolute"
              top="8px"
              right="8px"
              size="sm"
              variant="neutral_icon"
              bg="rgba(255, 255, 255, 0.9)"
              onClick={() => handleRemoveFile(0)}
              leftIcon={<DeleteSmallGray />}
            />
          </Box>
          <Box mt="8px" textAlign="center">
            <TypoGraph
              variant="label01"
              color="blue.700"
              cursor="pointer"
              onClick={(e) => handleClick(e)}
            >
              {t("product.registration.imageUpload")}
            </TypoGraph>
          </Box>
        </Box>
      );
    }

    return (
      <Box>
        <Grid templateColumns="repeat(auto-fit, minmax(100px, 1fr))" gap="12px" mb="12px">
          {selectedFiles.map((file, index) => (
            <Box key={index} position="relative">
              <Box
                css={imagePreviewContainer}
                backgroundImage={`url(${createImagePreview(file)})`}
                backgroundSize="cover"
                backgroundPosition="center"
                h="100px"
                borderRadius="8px"
              >
                <IconButton
                  position="absolute"
                  top="4px"
                  right="4px"
                  size="sm"
                  variant="neutral_icon"
                  bg="rgba(255, 255, 255, 0.9)"
                  onClick={() => handleRemoveFile(index)}
                  leftIcon={<DeleteSmallGray />}
                />
              </Box>
            </Box>
          ))}
        </Grid>
        <Box textAlign="center">
          <TypoGraph
            variant="label01"
            color="blue.700"
            cursor="pointer"
            onClick={(e) => handleClick(e)}
          >
            {t("product.edit.addImage")}
          </TypoGraph>
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileSelect}
        style={{
          position: "absolute",
          opacity: 0,
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
      />

      <TypoGraph variant="body01" mb="8px" color="gray.900">
        {title}
      </TypoGraph>

      {renderFilePreview()}

      {hasError && (
        <Text fontSize="15px" color="red.500" textAlign="left" mt="4px">
          {errorText}
        </Text>
      )}
    </Box>
  );
};

export default FileUploadSection;

const uploadContainer = (isDragOver: boolean, hasError: boolean = false) => css`
  border: 2px dashed ${hasError ? "#FF5356" : isDragOver ? "#435CB0" : "#C4CCD6"};
  border-radius: 8px;
  cursor: pointer;
  background-color: ${isDragOver ? "#F2F4FC" : "#FAFAFA"};
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${hasError ? "#FF5356" : "#435CB0"};
    background-color: #f2f4fc;
  }
`;

const imagePreviewContainer = css`
  border: 2px solid #eaecf1;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
`;
