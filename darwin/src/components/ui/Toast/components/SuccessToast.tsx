import { Flex } from "@chakra-ui/react";

import { DeleteSmallWhite } from "@/assets/icons";

import { TypoGraph } from "../../Typography";

export const SuccessToast = ({
  data,
  closeToast,
}: {
  data: { title: string };
  closeToast: () => void;
}) => {
  return (
    <Flex
      bg="#212A4A"
      color="white"
      align="center"
      p="12px 16px"
      borderRadius="8px"
      w="fit-content"
    >
      <TypoGraph variant="label04" className="msg-title" whiteSpace="pre">
        {data.title}
      </TypoGraph>
      <Flex
        justifyContent="flex-end"
        minW="120px"
        style={{ cursor: "pointer" }}
        onClick={closeToast}
      >
        <DeleteSmallWhite />
      </Flex>
    </Flex>
  );
};
