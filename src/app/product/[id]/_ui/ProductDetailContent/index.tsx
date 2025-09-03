"use client";

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
  Flex,
} from "@chakra-ui/react";
import RouterBackButton from "@/components/RouterBackButton.tsx";
import ImageViewrPanel from "@/components/ImageViewrPanel";
import { formattedDotDate } from "@/util/dateUtil";
import Link from "next/link";
import useGetProduct from "@/api/products/client/useGetProduct";
import useDeleteProduct from "@/api/products/client/useDeleteProduct";
import useCartStore from "@/lib/zustand/useCartStore";

interface ProductDetailContentProps {
  productId: string;
}

const ProductDetailContent = ({ productId }: ProductDetailContentProps) => {
  const { data: product } = useGetProduct(productId);
  const { mutate: deleteProduct } = useDeleteProduct();
  const { addItem } = useCartStore();

  if (!product) {
    return (
      <Container centerContent p={8}>
        <Text>상품을 찾을 수 없습니다.</Text>
      </Container>
    );
  }

  const { name, description, stock, thumbnailUrl, detailFileUrls } = product;

  return (
    <Container maxW="container.xl" p={{ base: 4, md: 8 }}>
      <Flex mb={6} justify="space-between" align="center">
        <RouterBackButton url="/" text={`\u2190 상품 목록으로 돌아가기`} />
        <Flex gap={2} ml={2}>
          <Button
            as={Link}
            href={`/product/${productId}/modify`}
            size="sm"
            variant={"toggle"}
            aria-selected>
            수정하기
          </Button>
          <Button
            onClick={() => {
              if (!confirm("정말로 이 상품을 삭제하시겠습니까?")) return;
              deleteProduct({ productId });
            }}
            size="sm"
            variant={"toggle"}>
            삭제하기
          </Button>
        </Flex>
      </Flex>

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
                <ImageViewrPanel
                  imageProps={{
                    style: {
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    },
                    width: 500,
                    height: 500,
                    priority: true,
                    src: thumbnailUrl,
                    alt: name || "상품 이미지",
                  }}
                  images={[thumbnailUrl, ...(detailFileUrls || [])].filter(
                    (url): url is string => Boolean(url)
                  )}
                  position={0}
                />
              </Box>
              <Box p={4} width="100%">
                <Heading as="h3" size="sm" mb={4} color="primary.500">
                  상세 이미지
                </Heading>
                <HStack spacing={4}>
                  {(detailFileUrls || []).map((url, index) => (
                    <Box
                      key={index}
                      borderWidth="1px"
                      borderRadius="md"
                      overflow="hidden"
                      boxSize={{ base: "70px", md: "80px" }}>
                      <ImageViewrPanel
                        imageProps={{
                          width: 100,
                          height: 100,
                          src: url,
                          alt: `${name} 상세 이미지 ${index + 1}`,
                          style: {
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          },
                        }}
                        images={[
                          thumbnailUrl,
                          ...(detailFileUrls || []),
                        ].filter((url): url is string => Boolean(url))}
                        position={index + 1}
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
                {name}
              </Heading>

              <HStack spacing={2} color="gray.500">
                <Text fontSize="sm">
                  {formattedDotDate(new Date().toISOString())}
                </Text>
              </HStack>

              <VStack align="start" spacing={2}>
                <Heading as="h2" size="sm" color="primary.500">
                  상품 설명
                </Heading>
                <Text color="gray.600" lineHeight="tall">
                  {description}
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
                  재고 {stock}개
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
                <Button
                  onClick={() => {
                    addItem({
                      productId,
                      quantity: 1,
                    });
                    alert("장바구니에 상품이 추가되었습니다.");
                  }}
                  variant={"toggle"}
                  size="md"
                  flex={1}>
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

export default ProductDetailContent;
