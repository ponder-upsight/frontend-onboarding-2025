import ProductAddForm from "@/app/product/add/_ui/ProductAddForm";
import { Flex } from "@chakra-ui/react";

const ProductAdd = () => {
  return (
    <Flex justify="center" align="center" minH="100vh" p={4} width={"100%"}>
      <ProductAddForm />
    </Flex>
  );
};
export default ProductAdd;

export const revalidate = 3600;
