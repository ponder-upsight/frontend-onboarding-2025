import { Box, CloseButton } from "@chakra-ui/react";
import Image from "next/image";

type PreviewImageBoxProps = {
  src: string;
  alt: string;
  onRemove?: () => void;
};

const PreviewImageBox = ({ src, alt, onRemove }: PreviewImageBoxProps) => (
  <Box
    position="relative"
    display="inline-block"
    mb={2}
    borderRadius="md"
    boxSize="150px">
    <Image src={src} alt={alt} objectFit="cover" width={150} height={150} />
    {onRemove && (
      <CloseButton
        position="absolute"
        top="2"
        right="2"
        size="sm"
        bg="red.500"
        color="white"
        _hover={{ bg: "red.600" }}
        onClick={onRemove}
      />
    )}
  </Box>
);

export default PreviewImageBox;
