"use client";
import useCustomConfirmStore from "@/shared/lib/zustand/useCustomConfirmStroe";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  Flex,
  Icon,
} from "@chakra-ui/react";
import Image from "next/image";

const CustomConfirmModal = () => {
  const { isOpen, title, description, yesText, noText, iconSrc, closeConfirm } =
    useCustomConfirmStore();

  // 모달 외부 클릭이나 Esc 키로 닫힐 때 '취소'로 처리
  const handleClose = () => closeConfirm(false);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex align="center" gap={2}>
            {iconSrc &&
              (typeof iconSrc === "string" ? (
                <Image
                  src={iconSrc}
                  alt="icon"
                  style={{ width: 24, height: 24 }}
                />
              ) : (
                <Icon as={iconSrc} boxSize={6} color="blue.500" />
              ))}
            {title}
          </Flex>
        </ModalHeader>
        <ModalBody>
          {/* pre-wrap을 사용해 \n(줄바꿈) 문자를 인식 */}
          <Text whiteSpace="pre-wrap">{description}</Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={() => closeConfirm(false)}>
            {noText || "아니요"}
          </Button>
          <Button colorScheme="blue" onClick={() => closeConfirm(true)}>
            {yesText || "네"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomConfirmModal;
