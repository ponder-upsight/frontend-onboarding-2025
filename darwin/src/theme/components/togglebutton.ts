import { switchAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  switchAnatomy.keys
);

const primary = definePartsStyle({
  container: {
    animation: "none",
  },
  track: {
    width: "48px",
    height: "28px",
    borderRadius: "9999px",
    bg: "gray.400",
    p: "0px",
    _checked: {
      bg: "blue.600",
    },
  },
  thumb: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    bg: "white",
    position: "absolute",
    top: "50%",
    transform: "translate(4px, -50%)",
    _checked: {
      transform: "translate(24px, -50%)",
    },
  },
});

export const togglebuttonTheme = defineMultiStyleConfig({
  variants: { primary },
});
