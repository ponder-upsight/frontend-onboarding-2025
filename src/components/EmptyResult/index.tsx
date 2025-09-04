import { Box, VStack, Heading, Text } from "@chakra-ui/react";

interface EmptyResultProps {
  heading?: string;
  text?: string;
}

const EmptyResult = ({ heading, text }: EmptyResultProps) => {
  return (
    <Box p={8} textAlign="center">
      <VStack spacing={4}>
        <Heading size="md" color="gray.700">
          {heading}
        </Heading>
        <Text color="gray.500">{text}</Text>
      </VStack>
    </Box>
  );
};

export default EmptyResult;
