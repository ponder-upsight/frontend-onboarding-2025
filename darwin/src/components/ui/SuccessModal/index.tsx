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

import { Chip } from "../Chip";

interface ModalProps {
  title: string;
  isOpen: boolean;
  confirmBtn: string;
  content?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const SuccessModal = ({
  title,
  confirmBtn,
  content,
  isOpen,
  onConfirm,
  onClose,
}: ModalProps) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        w="652px"
        minH="178px"
        h="auto"
        borderRadius="8px"
        border={"1px solid #C4CCD6"}
        box-shadow={"0px 5px 5px 0px rgba(191, 191, 191, 0.15)"}
        p="20px"
        minW="652px"
      >
        <VStack spacing="16px" align="stretch" gap={0}>
          <Flex justifyContent="space-between" alignItems={"center"} py="7px">
            <Text textStyle="headline01" color={"blue.900"}>
              {title}
            </Text>
          </Flex>
          <Spacer />

          <Text textStyle="body02" color="GREY_0" whiteSpace="pre-wrap" mt={16} mb={16}>
            {content}
          </Text>

          <Box display="flex" justifyContent="flex-end" gap="12px" mt="auto">
            <Chip
              variant="primary"
              p="13px 30px"
              minW="84px"
              h="44px"
              onClick={() => {
                onConfirm();
              }}
            >
              {confirmBtn}
            </Chip>
          </Box>
        </VStack>
      </ModalContent>
    </ChakraModal>
  );
};
