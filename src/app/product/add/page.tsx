import ProductModifyForm from "@/components/ProductModifyForm";
import { Flex } from "@chakra-ui/react";

const ProductAdd = () => {
  return (
    <Flex justify="center" align="center" minH="100vh" p={4} width={"100%"}>
      <ProductModifyForm isAddPage />
    </Flex>
  );
};
export default ProductAdd;
