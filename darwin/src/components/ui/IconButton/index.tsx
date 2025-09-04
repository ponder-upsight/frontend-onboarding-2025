import { Button, ButtonProps, Flex } from "@chakra-ui/react";

interface IconButtonProps extends ButtonProps {
  leftIcon?: ButtonProps["leftIcon"];
  rightIcon?: ButtonProps["leftIcon"];
  variant?:
    | "primary_icon"
    | "neutral_icon"
    | "primary"
    | "secondary"
    | "neutral"
    | "assistive"
    | "outlined";
  size?: "sm" | "md";
}

export const IconButton = ({
  leftIcon,
  size = "sm",
  variant = "outlined",
  rightIcon,
  children,
  justifyContent = "center",
  alignItems = "center",
  ...rest
}: IconButtonProps) => {
  const width = size === "sm" ? "40px" : size === "md" ? "44px" : (rest.w ?? "auto");
  const height = size === "sm" ? "40px" : size === "md" ? "44px" : (rest.h ?? "auto");
  const minWidth =
    size === "sm" ? "40px" : size === "md" ? "44px" : (rest.minW ?? "auto");
  const minHeight =
    size === "sm" ? "40px" : size === "md" ? "44px" : (rest.minH ?? "auto");

  return (
    <Button
      p={0}
      w={width}
      h={height}
      minH={minHeight}
      minW={minWidth}
      variant={variant}
      {...rest}
    >
      <Flex
        w="full"
        h="full"
        cursor={"pointer"}
        p={0}
        alignItems={alignItems}
        flexDir={"row"}
        justifyContent={justifyContent}
        gap={8}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </Flex>
    </Button>
  );
};
