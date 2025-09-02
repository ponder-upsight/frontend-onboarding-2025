import getProduct from "@/api/product/getProduct";
import Image from "next/image";
import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  HStack,
  VStack,
  Card,
  CardBody,
  Tag,
} from "@chakra-ui/react";
import Link from "next/link";
import RouterBackButton from "@/components/RouterBackButton.tsx";

export const revalidate = 3600;

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps) {
  const { product } = await getProduct(params.id);
  return {
    title: product?.name || "상품 상세",
    description: product?.description || "상품 상세 페이지입니다.",
  };
}

const ProductDetailPage = async ({ params }: PageProps) => {
  const { id } = params;
  const { product } = await getProduct(id);

  if (!product) {
    return (
      <Container centerContent p={8}>
        <Text>상품을 찾을 수 없습니다.</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" p={{ base: 4, md: 8 }}>
      <Box mb={6}>
        <RouterBackButton
          url="/product-list"
          defaultParam="1"
          text={`\u2190 상품 목록으로 돌아가기`}
        />
      </Box>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={{ base: 3, md: 5 }}>
        {/* 왼쪽: 이미지 카드 */}
        <GridItem>
          <Card variant="outline" h="full">
            <VStack align="start">
              <Box
                borderRadius="md"
                width={"100%"}
                position="relative"
                aspectRatio="1 / 1"
                overflow="hidden">
                <Image
                  src={product.thumbUrl}
                  alt={product.name}
                  // width={600}
                  // height={600}
                  // style={{ width: "100%", height: "auto" }}
                  fill
                  priority
                />
              </Box>
              <Box p={4} width="100%">
                <Heading as="h3" size="sm" mb={4} color="primary.500">
                  상세 이미지
                </Heading>
                <HStack spacing={4}>
                  {product.imageUrls.map((url, index) => (
                    <Box
                      key={index}
                      borderWidth="1px"
                      borderRadius="md"
                      overflow="hidden"
                      boxSize={{ base: "70px", md: "80px" }}>
                      <Image
                        src={url}
                        alt={`${product.name} 상세 이미지 ${index + 1}`}
                        width={100}
                        height={100}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  ))}
                </HStack>
              </Box>
            </VStack>
          </Card>
        </GridItem>

        {/* 오른쪽: 상품 정보 카드 */}
        <GridItem>
          <Card variant="outline" h="full">
            <CardBody as={VStack} align="start" spacing={5}>
              <Heading as="h1" size="md" color="primary.500">
                {product.name}
              </Heading>

              <HStack spacing={2} color="gray.500">
                <Text fontSize="sm">{product.createdAt}</Text>
              </HStack>

              <VStack align="start" spacing={2}>
                <Heading as="h2" size="sm" color="primary.500">
                  상품 설명
                </Heading>
                <Text color="gray.600" lineHeight="tall">
                  {product.description}
                </Text>
              </VStack>

              <VStack align="start" spacing={2}>
                <Heading as="h2" size="sm" color="primary.500">
                  재고 정보
                </Heading>
                <Tag
                  size="lg"
                  variant="solid"
                  bg="black"
                  color="white"
                  borderRadius="md"
                  px={4}>
                  재고 {product.stock}개
                </Tag>
              </VStack>

              <HStack
                spacing={3}
                mt="auto !important"
                pt={5}
                borderTopWidth="1px"
                w="full">
                <Button variant={"toggle"} aria-selected size="md" flex={1}>
                  주문하기
                </Button>
                <Button variant={"toggle"} size="md" flex={1}>
                  장바구니
                </Button>
              </HStack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;
