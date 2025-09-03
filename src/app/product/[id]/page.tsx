import getProduct from "@/api/products/server/getProduct";
import { Container, Text } from "@chakra-ui/react";
import ProductContent from "./_ui/ProductContent";
import { HydrationBoundary } from "@tanstack/react-query";
import getPrefetchHydrateProduct from "@/api/products/server/getPrefetchHydrateProduct";

export const revalidate = 3600;

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps) {
  const product = await getProduct({ productId: params.id });

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

const ProductDetailPage = async ({ params }: PageProps) => {
  const { id } = params;
  const dehydratedState = await getPrefetchHydrateProduct(id);

  if (!dehydratedState) {
    return (
      <Container centerContent p={8}>
        <Text>상품을 찾을 수 없습니다.</Text>
      </Container>
    );
  }

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductContent productId={id} />
    </HydrationBoundary>
  );
};

export default ProductDetailPage;
