import ProductAddForm from "@/app/product/add/_ui/ProductAddForm";
import { Flex } from "@chakra-ui/react";

export const metadata = {
  title: "상품 등록페이지",
  description: "상품 등록페이지입니다.",
};

const ProductAdd = () => {
  return (
    <Flex justify="center" align="center" minH="100vh" p={4} width={"100%"}>
      <ProductAddForm />
    </Flex>
  );
};
export default ProductAdd;

export const revalidate = 3600;
