"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  HStack,
  Box,
  Flex,
  AspectRatio,
  Text,
  Skeleton,
} from "@chakra-ui/react";

import useImageModalStore from "@/shared/lib/zustand/useImageModalStore";
import Image from "next/image";
import useImageLoadingHandler from "./hooks/useImageLoadingHandler";

const ImageDetailViewersModal = () => {
  const { isOpen, images, currentPosition, closeModal, setPosition } =
    useImageModalStore();

  const { isImageLoading, handleSetIsImageLoading } = useImageLoadingHandler({
    images,
    currentPosition,
  });

  const handleModalBodyClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // 이미지가 없거나 비어있으면 아무것도 렌더링하지 않음
  if (!images || images.length === 0) {
    return null;
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      size="4xl"
      isCentered
      closeOnOverlayClick={true}>
      <ModalOverlay bg="blackAlpha.800" />
      <ModalContent bg="transparent" shadow="none">
        <ModalCloseButton color="white" size="lg" />
        <ModalBody p={0}>
          <Flex
            onClick={handleModalBodyClick}
            direction="column"
            align="center"
            gap={4}>
            {/* 큰 이미지 */}
            <AspectRatio ratio={16 / 9} w="100%" maxH="70vh">
              <Box position="relative">
                {isImageLoading && (
                  <Skeleton
                    width="100%"
                    height="100%"
                    borderRadius="md"
                    startColor="gray.600"
                    endColor="gray.800"
                  />
                )}
                <Image
                  src={images[currentPosition]}
                  alt={`상세 이미지 ${currentPosition + 1}`}
                  width={800}
                  height={450}
                  style={{
                    objectFit: "cover",
                    borderRadius: "6px",
                    display: isImageLoading ? "none" : "block",
                  }}
                  priority
                  onLoad={() => handleSetIsImageLoading(false)}
                  onError={() => handleSetIsImageLoading(false)}
                />
              </Box>
            </AspectRatio>

            {/* 현재 위치 표시 */}
            <Text
              color="white"
              fontSize="lg"
              fontWeight="semibold"
              bg="blackAlpha.600"
              px={3}
              py={1}
              borderRadius="md">
              {currentPosition + 1} / {images.length}
            </Text>

            {/* 썸네일 목록 */}
            <HStack
              spacing={3}
              p={2}
              bg="blackAlpha.400"
              borderRadius="md"
              maxW="100%"
              overflowX="auto">
              {images.map((imgUrl, index) => (
                <Box
                  key={index}
                  boxSize="80px"
                  onClick={() => setPosition(index)}
                  cursor="pointer"
                  border="3px solid"
                  // 현재 선택된 이미지에만 파란색 테두리 적용
                  borderColor={
                    currentPosition === index ? "blue.400" : "transparent"
                  }
                  borderRadius="md"
                  overflow="hidden"
                  transition="border-color 0.2s">
                  <Image
                    src={imgUrl}
                    alt={`썸네일 ${index + 1}`}
                    width={80}
                    height={80}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </HStack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImageDetailViewersModal;
