"use client";

import { useState } from "react";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { TypoGraph } from "@/app/components/ui/Typography";
import { Product } from "@/data/products";
import { useTranslation } from "@/app/i18n/client";

interface ImageGalleryProps {
  product: Product;
  lng: string;
}

const ImageGallery = ({ product, lng }: ImageGalleryProps) => {
  const [imageError, setImageError] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { t } = useTranslation(lng);
  const images = [product.imageUrl, ...product.detailImageUrls];

  return (
    <VStack spacing="16px" align="stretch">
      <Box
        h="400px"
        bg="gray.100"
        borderRadius="8px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        {imageError ? (
          <Box
            w="300px"
            h="300px"
            bg="gray.200"
            borderRadius="4px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <TypoGraph variant="label04" color="gray.500">
              {t("imageNone")}
            </TypoGraph>
          </Box>
        ) : (
          <Box
            as="img"
            src={images[selectedImageIndex]}
            alt={product.name}
            maxH="380px"
            maxW="100%"
            objectFit="contain"
            onError={() => setImageError(true)}
          />
        )}
      </Box>

      <Box>
        <TypoGraph variant="label03" color="gray.700" mb="8px">
          {t("detailImage")}
        </TypoGraph>
        <Flex gap="8px">
          {images.map((imageUrl, index) => (
            <Box
              key={index}
              w="80px"
              h="80px"
              bg="gray.100"
              borderRadius="4px"
              border={selectedImageIndex === index ? "2px solid" : "1px solid"}
              borderColor={selectedImageIndex === index ? "blue.500" : "gray.300"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              overflow="hidden"
              onClick={() => setSelectedImageIndex(index)}
            >
              <Box
                as="img"
                src={imageUrl}
                alt={`${product.name} ${index + 1}`}
                maxH="70px"
                maxW="70px"
                objectFit="contain"
                onError={() => {
                  if (index === selectedImageIndex) {
                    setImageError(true);
                  }
                }}
              />
            </Box>
          ))}
        </Flex>
      </Box>
    </VStack>
  );
};

export default ImageGallery;
