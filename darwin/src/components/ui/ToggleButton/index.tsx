import { Switch } from "@chakra-ui/react";
import { SwitchProps } from "@chakra-ui/react";

interface ToggleButtonProps extends SwitchProps {
  variant?: "primary" | "text";
}

export const ToggleButton = ({ variant = "primary", ...rest }: ToggleButtonProps) => {
  return <Switch variant={variant} {...rest} />;
};
