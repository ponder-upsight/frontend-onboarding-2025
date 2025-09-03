import {
  VStack,
  HStack,
  Image,
  Text,
  Button,
  Alert,
  AlertIcon,
  Card,
  CardBody,
  Badge,
} from "@chakra-ui/react";
import useGetProduct from "@/api/products/client/useGetProduct";
import usePostPurchaseProduct from "@/api/products/client/usePostPurchaseProduct";
import useCartCount from "./_hooks/useCartCount";

interface CartItemWithProductProps {
  productId: string;
  quantity: number;
}

const CartItemWithProduct = ({
  productId,
  quantity,
}: CartItemWithProductProps) => {
  const { data: product, isLoading, error } = useGetProduct(productId);
  const { count, handleIncrease, handleDecrease, handleRemove } = useCartCount({
    product,
    quantity,
    productId,
  });

  const { mutate: postPurchaseProduct } = usePostPurchaseProduct();

  if (isLoading) {
    return (
      <Card>
        <CardBody>
          <Text>상품 정보를 불러오는 중...</Text>
        </CardBody>
      </Card>
    );
  }

  if (error || !product) {
    return (
      <Card>
        <CardBody>
          <Alert status="error">
            <AlertIcon />
            상품 정보를 불러올 수 없습니다.
          </Alert>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody>
        <HStack spacing={4} align="center">
          <Image
            src={product.thumbnailUrl}
            alt={product.name}
            boxSize="100px"
            objectFit="cover"
            borderRadius="md"
            fallbackSrc="https://via.placeholder.com/100"
          />

          <VStack align="start" spacing={2} flex={1}>
            <Text fontWeight="bold" fontSize="lg">
              {product.name}
            </Text>
            <Text color="gray.600" noOfLines={2}>
              {product.description}
            </Text>
            <HStack>
              <Badge colorScheme="blue">재고: {product.stock}개</Badge>
              <Text fontWeight="bold" color="blue.500">
                {product.stock.toLocaleString()}원
              </Text>
            </HStack>
          </VStack>

          <VStack spacing={2}>
            <HStack>
              <Button size="sm" onClick={handleDecrease}>
                -
              </Button>
              <Text fontWeight="bold" minW="40px" textAlign="center">
                {count}
              </Text>
              <Button size="sm" onClick={handleIncrease}>
                +
              </Button>
            </HStack>

            <Text fontWeight="bold" color="red.500">
              {(product.stock * count).toLocaleString()}원
            </Text>

            <HStack spacing={2}>
              <Button
                size="sm"
                colorScheme="red"
                variant="outline"
                onClick={handleRemove}>
                삭제
              </Button>
              {
                <Button
                  size="sm"
                  colorScheme="green"
                  onClick={() => postPurchaseProduct({ productId, quantity })}>
                  구매
                </Button>
              }
            </HStack>
          </VStack>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default CartItemWithProduct;
