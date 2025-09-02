import { Box, Image, Text, Badge, Flex, Button } from "@chakra-ui/react";

import { Product } from "@/types/products";
import { formattedDotDate } from "@/util/dateUtil";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { name, description, stock, createdAt, imageUrl } = product;

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      bg="white">
      <Image
        src={imageUrl}
        alt={name}
        objectFit="cover"
        height="200px"
        width="100%"
      />

      <Box p="6">
        <Text
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
          fontSize="l">
          {name}
        </Text>

        <Text mt="2" color="gray.600" fontSize="sm" noOfLines={2}>
          {description}
        </Text>

        <Flex justify="space-between" align="center" mt="4">
          <Badge
            borderRadius="full"
            px="2"
            colorScheme={stock > 0 ? "teal" : "red"}>
            재고: {stock}개
          </Badge>
          <Text fontSize="sm" color="gray.500">
            {formattedDotDate(createdAt)}
          </Text>
        </Flex>

        <Button
          mt="6"
          width="100%"
          colorScheme="blue"
          variant="outline"
          // leftIcon={<Icon as={ViewIcon} />}
        >
          상세보기
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;
