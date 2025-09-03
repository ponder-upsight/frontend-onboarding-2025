import getProduct from "@/api/products/server/getProduct";
import ProductModifyForm from "@/components/ProductModifyForm";
import { Container, Text } from "@chakra-ui/react";

export const revalidate = 3600;

interface PageProps {
  params: { id: string };
}

const ProductModifyPage = async ({ params }: PageProps) => {
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
    <ProductModifyForm
      initData={{ name, description, stock, thumbnailUrl, detailFileUrls }}
    />
  );
};

export default ProductModifyPage;
