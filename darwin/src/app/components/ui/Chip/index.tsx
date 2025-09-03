import { ReactNode } from "react";

import { ButtonProps, Tag } from "@chakra-ui/react";

interface ChipProps extends Omit<ButtonProps, "lefticon"> {
  variant?: "primary" | "outlined" | "neutral" | "assistive";
  LeftIcon?: ReactNode;
  RightIcon?: ReactNode;
}

export const Chip = ({ variant, LeftIcon, RightIcon, ...rest }: ChipProps) => {
  return (
    <Tag
      variant={variant}
      sx={{
        lineHeight: "1.5",
        display: "inline-flex",
        padding: "7.5px 12px",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.625rem",
        flexShrink: 0,
      }}
      {...rest}
    >
      {LeftIcon}
      {rest.children}
      {RightIcon}
    </Tag>
  );
};
