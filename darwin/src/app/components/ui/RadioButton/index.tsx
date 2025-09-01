import { RadioProps } from "@chakra-ui/react";
import { Radio as ChakraRadio } from "@chakra-ui/react";

interface CustomRadioProps extends RadioProps {
  variant?: "primary";
}
export const RadioButton = ({ variant = "primary", ...rest }: CustomRadioProps) => {
  return (
    <ChakraRadio variant={variant} {...rest}>
      {rest.children}
    </ChakraRadio>
  );
};
