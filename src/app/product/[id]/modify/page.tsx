import getProduct from "@/api/products/server/getProduct";
import ProductModifyForm from "@/app/product/[id]/modify/_ui/ProductModifyForm";
import { Container, Text } from "@chakra-ui/react";

export const revalidate = 3600;

interface PageProps {
  params: { id: string };
}

const ProductModifyPage = async ({ params }: PageProps) => {
  const { id } = params;
  const product = await getProduct({
    productId: id,
  });

  if (!product) {
    return (
      <Container centerContent p={8}>
        <Text>상품을 찾을 수 없습니다.</Text>
      </Container>
    );
  }

  return <ProductModifyForm initData={{ id, ...product }} />;
};

export default ProductModifyPage;
