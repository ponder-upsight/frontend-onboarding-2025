import getProduct from "@/api/products/server/getProduct";
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

export const revalidate = 3600;

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps) {
  const { name, description } = await getProduct({ productId: params.id });
  return {
    title: name || "상품 상세",
    description: description || "상품 상세 페이지입니다.",
  };
}

const ProductDetailPage = async ({ params }: PageProps) => {
  const { id } = params;
  const { name, description, stock, thumbnailUrl, detailFileUrls } =
    await getProduct({
      productId: id,
    });

  if (!name) {
    return (
      <Container centerContent p={8}>
        <Text>상품을 찾을 수 없습니다.</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" p={{ base: 4, md: 8 }}>
      <Flex mb={6} justify="space-between" align="center">
        <RouterBackButton
          url=""
          defaultParam=""
          text={`\u2190 상품 목록으로 돌아가기`}
        />
        <Button
          as={Link}
          href={`/product/${id}/modify`}
          size="sm"
          variant={"toggle"}
          aria-selected>
          수정하기
        </Button>
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
                    alt: name,
                  }}
                  images={[thumbnailUrl, ...detailFileUrls]}
                  position={0}
                />
              </Box>
              <Box p={4} width="100%">
                <Heading as="h3" size="sm" mb={4} color="primary.500">
                  상세 이미지
                </Heading>
                <HStack spacing={4}>
                  {detailFileUrls.map((url, index) => (
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
                        images={[thumbnailUrl, ...detailFileUrls]}
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
