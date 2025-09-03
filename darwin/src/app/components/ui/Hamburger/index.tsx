import { forwardRef } from "react";

import { Box } from "@chakra-ui/react";

interface HamburgerProps {
  onClick: (e: React.MouseEvent) => void;
}

export const Hamburger = forwardRef<HTMLButtonElement, HamburgerProps>(
  ({ onClick }, ref) => {
    return (
      <Box
        as="button"
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        width="24px"
        height="18px"
        bg="transparent"
        border="none"
        cursor="pointer"
        onClick={onClick}
        ref={ref}
      >
        <Box height="2px" bg="gray.800" />
        <Box height="2px" bg="gray.800" />
        <Box height="2px" bg="gray.800" />
      </Box>
    );
  }
);
Hamburger.displayName = "Hamburger";
