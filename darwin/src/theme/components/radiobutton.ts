import { radioAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  radioAnatomy.keys
);

const primary = definePartsStyle({
  control: {
    w: "1.5rem",
    h: "1.5rem",
    color: "gray.700",
    bg: "white",
    border: "2px solid #979BA9",
    _disabled: {
      border: "2px solid rgba(151, 155, 169, 0.5)",
    },

    _checked: {
      bg: "white",
      color: "blue.700",
      _hover: {
        bg: "white",
        color: "blue.700",
      },
      _disabled: {
        border: "2px solid rgba(34, 58, 136, 0.15)",
        color: "rgba(34,58,136,0.15)",
      },
      _before: {
        w: "70%",
        h: "70%",
      },
    },
  },
});

export const radiobuttonTheme = defineMultiStyleConfig({
  variants: { primary },
});
