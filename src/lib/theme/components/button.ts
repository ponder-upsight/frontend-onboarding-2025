import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const solid = defineStyle({
  bg: "primary.500",
  color: "white",
  _hover: {
    bg: "primary.600",
  },
  _active: {
    bg: "primary.700",
  },
  _disabled: {
    bg: "gray.300",
    cursor: "not-allowed",
    _hover: {
      bg: "gray.300",
    },
  },
});

const outline = defineStyle({
  border: "1px solid",
  borderColor: "primary.500",
  color: "primary.500",
  bg: "transparent",
  _hover: {
    bg: "primary.50",
  },
  _active: {
    bg: "primary.100",
  },
  _disabled: {
    borderColor: "gray.300",
    color: "gray.300",
    cursor: "not-allowed",
    _hover: {
      bg: "transparent",
    },
  },
});

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    borderRadius: "md",
    fontWeight: "semibold",
    _focusVisible: {
      boxShadow: "outline",
    },
  },
  sizes: {
    lg: {
      h: 12,
      minW: 12,
      fontSize: "lg",
      px: 6,
    },
    md: {
      h: 10,
      minW: 10,
      fontSize: "md",
      px: 4,
    },
  },
  variants: {
    solid,
    outline,
  },
  defaultProps: {
    variant: "solid",
    size: "md",
  },
});
