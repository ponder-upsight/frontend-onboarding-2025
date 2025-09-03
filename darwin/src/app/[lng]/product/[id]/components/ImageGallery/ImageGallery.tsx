"use client";

import { useState } from "react";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { TypoGraph } from "@/app/components/ui/Typography";
import { useI18n } from "@/app/i18n/I18nProvider";
import { useImageGallery } from "@/app/[lng]/product/[id]/components/ImageGallery/useImageGallery";

interface ImageGalleryProps {
  images: {
    url: string;
    name: string;
  }[];
}

const ImageGallery = ({
  images,
}: ImageGalleryProps) => {
  const [imageError, setImageError] = useState(false);
  const { t } = useI18n();
  const { currentImage, changeCurrentImage } = useImageGallery({
    images
  });

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
            src={currentImage.url}
            alt={currentImage.name}
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
          {images.map((image, index) => (
            <Box
              key={index}
              w="80px"
              h="80px"
              bg="gray.100"
              borderRadius="4px"
              border={currentImage.url === image.url ? "2px solid" : "1px solid"}
              borderColor={currentImage.url === image.url ? "blue.500" : "gray.300"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              overflow="hidden"
              onClick={() => changeCurrentImage(index)}
            >
              <Box
                as="img"
                src={image.url}
                alt={`${image.name} ${index + 1}`}
                maxH="70px"
                maxW="70px"
                objectFit="contain"
                onError={() => {
                  if (currentImage.url === image.url) {
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
