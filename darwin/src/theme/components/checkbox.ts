import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  checkboxAnatomy.keys
);

const primary = definePartsStyle({
  control: {
    w: "24px",
    h: "24px",
    accentColor: "gray.800",
    borderColor: "#c4ccd6",
    borderWidth: "2px",
    _disabled: {
      background: "white",
      border: "2px solid rgba(196,204,214,0.5)",
    },
    _checked: {
      bg: "blue.700",
      border: "1.5px solid #223A88",
      "& span": {
        margin: 0,
      },
      "& svg": {
        width: "18px",
        height: "18px",
      },
      _disabled: {
        background: "rgba(34,58,136,0.5)",
        color: "white",
      },
    },
    _indeterminate: {
      borderColor: "blue.700",
      backgroundColor: "blue.700",
    },
  },
  icon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    animation: "none",
    width: "24px",
    height: "24px",
    _disabled: {
      "& svg": {
        width: "24px",
        height: "24px",
      },
    },
    _checked: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "0 auto",
      animation: "none",
      w: "24px",
      h: "24px",
    },
    "& svg": {
      width: "24px",
      height: "24px",
    },
  },
});

export const checkboxTheme = defineMultiStyleConfig({
  variants: { primary },
});
