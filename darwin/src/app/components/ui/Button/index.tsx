import { forwardRef } from "react";

import { TypoGraph, TypoGraphProps } from "../Typography";
import { text } from "@/theme/foundations/text";
import { ButtonProps } from "@chakra-ui/react";
import { Button as ChakraButton } from "@chakra-ui/react";

interface CustomButtonProps extends ButtonProps {
  variant?:
    | "primary"
    | "secondary"
    | "neutral"
    | "assistive"
    | "outlined"
    | "primary_icon"
    | "neutral_icon"
    | "ghost"
    | "link";
  size?: "sm" | "md" | "lg" | "pagination";
  typoVariant?: keyof typeof text;
  typoProps?: Omit<TypoGraphProps, "variant">;
  useTypography?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    { variant, size = "md", typoVariant, typoProps = {}, useTypography = true, ...rest },
    ref
  ) => {
    return (
      <ChakraButton ref={ref} variant={variant} size={size} {...rest}>
        {useTypography ? (
          <TypoGraph as="span" variant={typoVariant || "label01"} {...typoProps}>
            {rest.children}
          </TypoGraph>
        ) : (
          rest.children
        )}
      </ChakraButton>
    );
  }
);
Button.displayName = "Button";
