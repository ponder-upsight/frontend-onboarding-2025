import { Flex, Heading, Text } from "@chakra-ui/react";

export const metadata = {
  title: "Home",
  description: "Welcome to our homepage!",
};

const HomePage = () => {
  return (
    <Flex direction={"column"} gap={2} width={"100%"} maxWidth={800}>
      <Heading
        as={"h2"}
        size={"lg"}
        color={"primary.500"}
        fontWeight={500}
        textAlign={"start"}>
        상품 목록
      </Heading>
      <Text color={"gray.600"}>총 {}개의 상품이 등록되어 있습니다.</Text>
    </Flex>
  );
};
export default HomePage;
