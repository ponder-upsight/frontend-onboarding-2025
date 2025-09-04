import { CheckboxProps } from "@chakra-ui/react";
import { Checkbox as ChakraCheckbox } from "@chakra-ui/react";

interface CustomCheckboxProps extends CheckboxProps {
  variant?: "primary";
}

export const Checkbox = ({ variant = "primary", ...rest }: CustomCheckboxProps) => {
  return (
    <ChakraCheckbox variant={variant} {...rest}>
      {rest.children}
    </ChakraCheckbox>
  );
};
