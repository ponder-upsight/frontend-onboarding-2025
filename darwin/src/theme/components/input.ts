import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  inputAnatomy.keys
);

const baseStyle = definePartsStyle({
  field: {
    fontSize: "15px",
    lineHeight: "21px",
    border: "2px solid",
    borderColor: "gray.300",
    borderRadius: "radius-04",
    minHeight: "44px",
    px: "16px",
    py: "12px",
    fontWeight: 500,
    color: "gray.900",
    _placeholder: {
      color: "gray.700",
    },
    _focus: {
      borderColor: "blue.700",
      boxShadow: "0 0 0 1px blue.700",
    },
    _hover: {
      borderColor: "gray.400",
    },
    _invalid: {
      borderColor: "red.400",
      boxShadow: "0 0 0 1px red.400",
      _placeholder: {
        color: "gray.700",
      },
    },
  },
});

export const Input = defineMultiStyleConfig({
  baseStyle,
});
