import getPrefetchHydrateProduct from "@/api/products/server/getPrefetchHydrateProduct";
import ProductModifyForm from "@/app/product/[id]/modify/_ui/ProductModifyForm";
import { Container, Text } from "@chakra-ui/react";
import { HydrationBoundary } from "@tanstack/react-query";

export const revalidate = 3600;

interface PageProps {
  params: { id: string };
}

const ProductModifyPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const dehydrateProduct = await getPrefetchHydrateProduct({
    productId: id,
  });

  if (!dehydrateProduct) {
    return (
      <Container centerContent p={8}>
        <Text>상품을 찾을 수 없습니다.</Text>
      </Container>
    );
  }

  return (
    <HydrationBoundary state={dehydrateProduct}>
      <ProductModifyForm productId={id} />
    </HydrationBoundary>
  );
};

export default ProductModifyPage;
