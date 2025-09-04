import { tagAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  tagAnatomy.keys
);

const baseStyle = definePartsStyle({
  container: {},
});

const primary = definePartsStyle({
  container: {
    cursor: "default",
    borderRadius: "4px",
    h: "32px",
    p: "8px 16px",
    bg: "blue.700",
    color: "white",
    fontWeight: 600,
    _hover: {
      borderRadius: "4px",
      bg: "blue.500",
    },
    _active: {
      borderRadius: "4px",
      bg: "blue.600",
    },
    _disabled: {
      borderRadius: "4px",
      bg: "gray.500",
      color: "gray.700",
      _hover: {
        pointerEvents: "none",
        bg: "gray.500",
        color: "gray.700",
      },
    },
  },
});

const outlined = definePartsStyle({
  container: {
    cursor: "default",
    border: "2px solid #EAECF1",
    borderRadius: "4px",
    color: "gray.900",
    fontWeight: 600,
    h: "32px",
    p: "8px 16px",
    bg: "white",
    _hover: {
      borderRadius: "4px",
      bg: "gray.200",
    },
    _active: {
      border: "2px solid #C4CCD6",
      bg: "gray.400",
      borderRadius: "4px",
    },

    _disabled: {
      _hover: {
        pointerEvents: "none",
        color: "gray.500",
        border: "2px solid #EAECF1",
        bg: "white",
      },
      color: "gray.500",
      border: "2px solid #EAECF1",
      bg: "white",
    },
  },
});

const assistive = definePartsStyle({
  container: {
    cursor: "default",
    borderRadius: "4px",
    fontWeight: 600,
    h: "32px",
    p: "8px 16px",
    background: "gray.300",
    _hover: {
      borderRadius: "4px",
      backgroundColor: "#DCDFE7",
    },
    _active: {
      backgroundColor: "#C4CCD6",
      borderRadius: "4px",
    },
    _selected: {
      backgroundColor: "#223A88",
      border: "none",
      borderRadius: "4px",
      color: "#fff",
    },
    _pressed: {
      backgroundColor: "#C4CCD6",
      border: "none",
      borderRadius: "4px",
    },
    _disabled: {
      borderRadius: "4px",
      _hover: {
        pointerEvents: "none",
        color: mode("gray.500", "gray.500"),
        border: "none",
        backgroundColor: mode("white", "white"),
      },
      color: mode("gray.500", "gray.500"),
      border: "none",
      backgroundColor: mode("white", "white"),
    },
  },
});

const neutral = definePartsStyle({
  container: {
    cursor: "default",
    borderRadius: "4px",
    color: "#1F2539",
    fontWeight: "600",
    h: "32px",
    p: "8px 16px",
    background: "#FFF",
    _hover: {
      backgroundColor: "#EEF1F4",
      borderRadius: "4px",
    },
    _active: {
      backgroundColor: "#C4CCD6",
      border: "none",
      borderRadius: "4px",
    },
    _selected: {
      backgroundColor: "#E7EBF8",
      border: "none",
      color: "#223A88",
      borderRadius: "4px",
    },
    _pressed: {
      backgroundColor: "#DCDFE7",
      border: "none",
      borderRadius: "4px",
    },
    _disabled: {
      borderRadius: "4px",
      _hover: {
        pointerEvents: "none",
        color: "#C4CCD6",
        border: "none",
        backgroundColor: "#FFF",
      },
      color: "#C4CCD6",
      border: "none",
      backgroundColor: "#FFF",
    },
  },
});

export const tagTheme = defineMultiStyleConfig({
  baseStyle,
  variants: {
    primary,
    outlined,
    neutral,
    assistive,
  },
});
