import { Flex } from "@chakra-ui/react";

interface LayoutProviderProps {
  children: React.ReactNode;
}

const LayoutProvider = ({ children }: LayoutProviderProps) => {
  return (
    <Flex pt={10} justifyContent={"center"} px={10}>
      {children}
    </Flex>
  );
};
export default LayoutProvider;
