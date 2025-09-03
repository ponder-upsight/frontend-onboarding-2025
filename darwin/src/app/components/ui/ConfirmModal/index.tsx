import {
  Box,
  Modal as ChakraModal,
  Flex,
  ModalContent,
  ModalOverlay,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

import { DeleteSmallGray } from "@/assets/icons";

import { Chip } from "../Chip";
import { IconButton } from "../IconButton";
import { TypoGraph } from "../Typography";

interface ModalProps {
  title: string;
  closeBtn?: string;
  isOpen: boolean;
  onClose: () => void;
  confirmBtn: string;
  content?: string;
  onConfirm: () => void;
}

export const ConfirmModal = ({
  title,
  closeBtn,
  confirmBtn,
  content,
  onClose,
  isOpen,
  onConfirm,
}: ModalProps) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        w="652px"
        // minH="192px"
        h="auto"
        borderRadius="8px"
        border={"1px solid #C4CCD6"}
        box-shadow={"0px 5px 5px 0px rgba(191, 191, 191, 0.15)"}
        p="20px"
        minW="652px"
      >
        <VStack spacing="16px" align="stretch" gap={0}>
          <Flex justifyContent="space-between" alignItems={"center"}>
            <Text textStyle="headline01" color={"blue.900"}>
              {title}
            </Text>
            <IconButton
              size="sm"
              variant="neutral_icon"
              leftIcon={
                <DeleteSmallGray
                  onClick={onClose}
                  style={{
                    cursor: "pointer",
                  }}
                />
              }
            />
          </Flex>
          <Spacer />

          <Text textStyle="body02" color="GREY_0" whiteSpace="pre-wrap" mt={16} mb={16}>
            {content}
          </Text>

          <Box display="flex" justifyContent="flex-end" gap="12px" mt="auto">
            {closeBtn && (
              <Chip
                minW="84px"
                h="44px"
                onClick={onClose}
                variant="outlined"
                cursor="pointer"
              >
                <TypoGraph variant="label01">{closeBtn}</TypoGraph>
              </Chip>
            )}

            <Chip
              variant="primary"
              p="13px 30px"
              minW="84px"
              h="44px"
              cursor="pointer"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              <TypoGraph variant="label01">{confirmBtn}</TypoGraph>
            </Chip>
          </Box>
        </VStack>
      </ModalContent>
    </ChakraModal>
  );
};
