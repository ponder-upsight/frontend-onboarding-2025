import { TextProps } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

import theme from "@/theme";
import { text } from "@/theme/foundations/text";

export interface TypoGraphProps extends Omit<TextProps, "borderRadius"> {
  variant: keyof typeof text;
  borderRadius?: keyof typeof theme.radii;
}

export const TypoGraph = ({
  children,
  variant = "label04",
  borderRadius,
  ...props
}: TypoGraphProps) => {
  return (
    <Text
      sx={{
        ...text[variant],
        ...(borderRadius && { borderRadius: theme.radii[borderRadius] }),
      }}
      {...props}
    >
      {children}
    </Text>
  );
};
