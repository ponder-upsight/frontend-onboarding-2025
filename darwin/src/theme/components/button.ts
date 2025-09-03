import { StyleFunctionProps, mode } from "@chakra-ui/theme-tools";

const disabledStyle = (bg = "gray.500", color = "gray.700") => ({
  backgroundColor: bg,
  color: color,
  cursor: "default",
  opacity: 1,
  _hover: {
    pointerEvents: "none",
    backgroundColor: bg,
    color: color,
  },
});

export const Button = {
  baseStyle: {
    // minW: "88px",
    // minH: "44px",
    borderRadius: "radius-04", // string token
    fontSize: "1rem",
    fontWeight: 500,
    fontStyle: "normal",
    lineHeight: "normal",
    _focus: {
      boxShadow: "none",
    },
  },
  sizes: {
    md: {
      h: "44px",
      // fontSize: "16px",
      // px: "16px",
    },
    sm: {
      h: "40px",
      // fontSize: "14px",
      // px: "12px",
    },
    pagination: {
      minW: "32px",
      minH: "32px",
      fontSize: "12px",
      p: "8px 4px",
    },
  },
  variants: {
    primary: (props: StyleFunctionProps) => ({
      bg: mode("blue.700", "blue.700")(props),
      color: "white",
      _hover: {
        bg: mode("blue.600", "blue.600")(props),
      },
      _active: {
        bg: mode("blue.700", "blue.700")(props),
      },
      _disabled: disabledStyle(),
    }),

    secondary: (props: StyleFunctionProps) => ({
      bg: mode("white", "white")(props),
      borderColor: mode("gray.700", "gray.700")(props),
      border: '1px solid',
      color: "blue.900",
      _hover: {
        bg: mode("gray.400", "gray.400")(props),
      },
      _selected: {
        bg: "gray.400",
        color: "blue.900",
      },
      _active: {
        bg: mode("blue.800", "blue.800")(props),
      },
      _disabled: disabledStyle(),
    }),

    neutral: (props: StyleFunctionProps) => ({
      bg: "white",
      color: "gray.900",
      _hover: {
        bg: "gray.200",
      },
      _active: {
        bg: "gray.400",
      },
      _selected: {
        bg: "blue.200",
      },
      _loading: {
        bg: "blue.200",
      },
      _truncated: {
        bg: "blue.200",
      },
      _disabled: disabledStyle("white", "gray.400"),
    }),

    assistive: (props: StyleFunctionProps) => ({
      bg: "gray.300",
      color: "gray.900",
      _hover: {
        bg: "gray.400",
      },
      _selected: {
        bg: "blue.200",
        color: "blue.700",
      },
      _active: {
        bg: "gray.400",
      },
      _pressed: {
        bg: "gray.400",
      },
      _disabled: disabledStyle("white", "gray.500"),
    }),

    outlined: (props: StyleFunctionProps) => ({
      w: props.w ?? "44px",
      h: props.h ?? "44px",
      p: "0.5rem 0.75rem",
      bg: "white",
      border: "2px solid",
      borderColor: "#EAECF1",
      _hover: {
        bg: "gray.200",
        borderColor: "#EAECF1",
      },
      _selected: {
        bg: "blue.200",
        borderColor: "#C4CCD6",
      },
      _active: {
        bg: "gray.400",
        borderColor: "#C4CCD6",
      },
      _pressed: {
        bg: "gray.400",
        borderColor: "#C4CCD6",
      },
      _disabled: {
        cursor: "default",
        bg: "white",
        borderColor: "#EAECF1",
        _hover: {
          pointerEvents: "none",
        },
      },
    }),

    neutral_icon: (props: StyleFunctionProps) => ({
      w: props.w ?? "44px",
      h: props.h ?? "44px",
      p: "0.5rem",
      borderRadius: "full",
      bg: "transparent",
      border: "none",
      _hover: {
        bg: "gray.200",
      },
      _selected: {
        bg: "blue.200",
      },
      _active: {
        bg: "blue.200",
      },
      _pressed: {
        bg: "gray.400",
      },
      _disabled: {
        cursor: "default",
        bg: "transparent",
        _hover: {
          pointerEvents: "none",
        },
      },
    }),

    primary_icon: (props: StyleFunctionProps) => ({
      w: props.w ?? "44px",
      h: props.h ?? "44px",
      p: "0.5rem",
      bg: "transparent",
      border: "none",
      _hover: {
        bg: "gray.400",
      },
      _active: {
        bg: "gray.500",
      },
      _pressed: {
        bg: "gray.500",
      },
      _disabled: {
        cursor: "default",
        bg: "transparent",
        _hover: {
          pointerEvents: "none",
        },
      },
    }),
    link: (props: StyleFunctionProps) => ({
      fontSize: "14px",
      letterSpacing: "0%",
      lineHeight: "160%",
      fontWeight: 600,
      color: "gray.800",
      _hover: {
        color: mode("blue.700", "blue.700")(props),
        textDecoration: "none",
      },
      _active: {
        color: mode("blue.700", "blue.700")(props),
        textDecoration: "none",
      },
      _disabled: disabledStyle(),
    }),
  },
  defaultProps: {
    size: "md",
  },
};
