import getProduct from "@/api/products/server/getProduct";
import { Container, Text } from "@chakra-ui/react";
import ProductDetailContent from "./_ui/ProductDetailContent";
import { HydrationBoundary } from "@tanstack/react-query";
import getPrefetchHydrateProduct from "@/api/products/server/getPrefetchHydrateProduct";

export const revalidate = 3600;

interface PageProps {
  params: { id: string };
  searchParams: { updated?: string };
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const product = await getProduct({ productId: id });

  if (!product) {
    return {
      title: "상품을 찾을 수 없음",
      description: "존재하지 않는 상품입니다.",
    };
  }

  const { name, description } = product;
  return {
    title: name || "상품 상세",
    description: description || "상품 상세 페이지입니다.",
  };
}

const ProductDetailPage = async ({ params, searchParams }: PageProps) => {
  const { id } = await params;

  // 수정 후 리다이렉트인지 확인
  const skipPrefetch = (await searchParams?.updated) === "true";

  const dehydratedState = await getPrefetchHydrateProduct({
    productId: id,
    enable: !skipPrefetch,
  });

  if (!skipPrefetch && !dehydratedState) {
    return (
      <Container centerContent p={8}>
        <Text>상품을 찾을 수 없습니다.</Text>
      </Container>
    );
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductDetailContent productId={id} />
    </HydrationBoundary>
  );
};

export default ProductDetailPage;
