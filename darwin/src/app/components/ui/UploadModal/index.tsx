import { useRef } from "react";
import { toast } from "react-toastify";

import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { TFunction } from "i18next";

import { DeleteSmallGray, PlusBigGray, PlusBlack } from "@/assets/icons";

import { runValidations } from "@/utils/validators/runValidations";
import { FileValidationRule } from "@/utils/validators/types";

import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { ErrorToast } from "../Toast";
import { TypoGraph } from "../Typography";
import { useDragAndDrop } from "./hooks/useDragAndDrop";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: File[];
  acceptFileType?: string;
  onAddFiles: (files: File[]) => void;
  onRemoveFile: (index: number) => void;
  onSubmit: () => void;
  isUploading: boolean;
  validationRules: FileValidationRule[];
  t?: TFunction;
}

interface DragAndDropHandlers {
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

const UploadModal = ({
  isOpen,
  onClose,
  files,
  acceptFileType,
  onAddFiles,
  onRemoveFile,
  onSubmit,
  isUploading,
  validationRules,
  t,
}: UploadModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { handleDragOver, handleDrop }: DragAndDropHandlers = useDragAndDrop({
    onDropFiles: (droppedFiles: File[]) => {
      droppedFiles.forEach((file: File) => {
        onAddFiles([file]);
      });
    },
    onRejectFile: (file: File, reason: string) =>
      toast(ErrorToast, {
        data: {
          title: `업로드 실패: ${file.name}: ${reason}`,
        },
        position: "bottom-center",
        autoClose: 3000,
      }),
    validationRules,
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles: File[] = [];

    for (const file of selectedFiles) {
      const errors = await runValidations(file, validationRules || []);
      if (errors.length > 0) {
        errors.forEach(() =>
          toast(ErrorToast, {
            data: {
              title: "파일 업로드 실패",
            },
            position: "bottom-center",
            autoClose: 3000,
          })
        );
      } else {
        validFiles.push(file);
      }
    }

    onAddFiles(validFiles);
    e.target.value = "";
  };

  const handleUploadBoxClick = () => {
    return files.length === 0 && fileInputRef.current?.click();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p={12} css={modalContentsContainer}>
        <ModalHeader>
          <TypoGraph variant="headline03" color="gray.900">
            {t?.("file-upload")}
          </TypoGraph>
        </ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody p={8}>
          <input
            ref={fileInputRef}
            type="file"
            hidden
            multiple
            accept={acceptFileType || "*/*"}
            onChange={handleFileChange}
          />

          <Box
            w="full"
            p={8}
            css={{
              background: files.length > 0 ? "#f9f9f9" : "#F4F6F8",
              borderRadius: "4px",
            }}
          >
            <Box
              css={[uploadArea(files.length > 0)]}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleUploadBoxClick}
            >
              <input
                type="file"
                accept={acceptFileType || "*/*"}
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                multiple
              />
              {files.length === 0 ? (
                <VStack spacing={4} align="center">
                  <Box bg="gray.300" borderRadius={8} p={16}>
                    <PlusBigGray />
                  </Box>
                  <TypoGraph variant="body02" mt={16}>
                    {t?.("drag-drop")}
                  </TypoGraph>
                  <br hidden />
                  <TypoGraph variant="body02" mb={16}>
                    {t?.("or")}
                  </TypoGraph>
                  <Button w="auto" variant="outlined">
                    <TypoGraph variant="label01" color="gray.900">
                      {t?.("select-from-file")}
                    </TypoGraph>
                  </Button>
                </VStack>
              ) : (
                <Box w="100%" borderRadius={8} border="2px solid #EAECF1" bg="white">
                  <VStack width="100%" margin="none" spacing={0} overflowX={"hidden"}>
                    {files.map((file, index) => (
                      <Flex
                        key={index}
                        borderBottom={"2px solid #EAECF1"}
                        justifyContent="space-between"
                        alignItems="center"
                        p={8}
                        width="100%"
                      >
                        <TypoGraph variant="label02" color="gray.900">
                          {file.name}
                        </TypoGraph>
                        <IconButton
                          p={0}
                          size="sm"
                          onClick={() => onRemoveFile(index)}
                          style={{ cursor: "pointer" }}
                          leftIcon={<DeleteSmallGray />}
                          variant="neutral_icon"
                        />
                      </Flex>
                    ))}
                  </VStack>
                </Box>
              )}
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Flex
            justifyContent={"space-between"}
            w="100%"
            gap={16}
            flexDir={files.length > 0 ? "row" : "row-reverse"}
          >
            {files.length > 0 && (
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outlined"
                minW="120px"
                p="12px 16px"
                leftIcon={<PlusBlack />}
                color="gray.900"
              >
                {t?.("additional-upload")}
              </Button>
            )}
            <Flex gap={2}>
              <Button variant="outlined" w="84px" color="gray.900" onClick={onClose}>
                {t?.("cancle")}
              </Button>
              <Button
                onClick={onSubmit}
                isLoading={isUploading}
                variant="primary"
                w="84px"
              >
                {t?.("upload")}
              </Button>
            </Flex>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadModal;

const uploadArea = (hasFiles: boolean) => css`
  background-color: gray.400;
  width: 100%;
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: ${hasFiles ? "none" : "center"};
  align-items: center;
  border: ${hasFiles ? "none" : "2px dashed "};
  border-color: gray.500;
  border-radius: 8px;
  text-align: center;
  overflow-y: auto;
  padding: ${hasFiles ? "none" : "20px"};
  cursor: ${hasFiles ? "default" : "pointer"};
`;

const modalContentsContainer = css`
  background-color: white;
  position: relative;
  min-width: 640px;
  min-height: 458px;
  border-radius: 8px;
  padding: 12px;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
