import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  menuAnatomy.keys
);

const baseStyle = definePartsStyle({
  button: {
    minW: "6rem",
    w: "224px",
    h: "2.5rem",
    fontSize: "0.9375rem",
    color: "gray.900",
    bg: "white",
    height: "44px",
    display: "flex",
    alignItems: "center",
    border: "2px solid #EAECF1",
    justifyContent: "space-between",
    borderRadius: "4px",
    padding: "12px 16px",
    outline: 0,
  },
  list: {
    boxShadow: "0px 0px 10px 5px rgba(136, 136, 136, 0.15)",
    background: "#fff",
    marginTop: "-4px",
  },
  item: {
    color: "gray.900",
    fontSize: "15px",
    width: "100%",
    height: "2.5rem",
    borderRadius: "4px",
    margin: "0 auto",
    padding: "12px 12px",
    fontStyle: "normal",
    lineHeight: "140%",
    fontWeight: 600,
    _active: {
      bg: "blue.700",
      fontWeight: 600,
    },
    _focus: {
      bg: "gray.200",
      fontWeight: 600,
    },

    _hover: {
      bg: "gray.200",
      fontWeight: 600,
    },
  },
});

const outlinedButtonStyle = definePartsStyle({
  button: {
    w: "auto",
    h: "2.5rem",
    bg: "transparent",
    fontWeight: 600,
    fontSize: "15px",
    textAlign: "center",
    color: "gray.900",
    px: "var(--spacing-8, 16px)",
    py: "var(--spacing-16, 8px)",
    borderRadius: "var(--radius-4, 4px)",
    border: "2px solid",
    borderColor: "gray.300",
    background: "gray.300",

    _hover: {
      background: "gray.700",
      borderColor: "gray.700",
    },
    // _active: {
    //   background: "var(--Semantic-button-Assistive-Pressed, #C4CCD6)",
    // },
  },
  list: baseStyle.list,
  item: baseStyle.item,
});

export const menuTheme = defineMultiStyleConfig({
  variants: {
    default: baseStyle,
    outline: outlinedButtonStyle,
  },
  defaultProps: {
    variant: "default",
  },
});
