import { Flex } from "@chakra-ui/react";

interface LayoutProviderProps {
  children: React.ReactNode;
}

const LayoutProvider = ({ children }: LayoutProviderProps) => {
  return (
    <Flex pt={5} justifyContent={"center"}>
      {children}
    </Flex>
  );
};
export default LayoutProvider;
