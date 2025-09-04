import { MenuItem, MenuItemProps } from "@chakra-ui/react";

import { useDropDownContext } from "./dropdownContext";

interface DropDownItemProps extends MenuItemProps {
  value: string;
}

export const DropDownItem = ({ value, children, ...rest }: DropDownItemProps) => {
  const { selectedValue, onSelect, onClose } = useDropDownContext();
  const isActive = value === selectedValue;

  return (
    <MenuItem
      bg={isActive ? "blue.200" : "transparent"}
      color={isActive ? "blue.800" : "gray.900"}
      onClick={() => {
        onSelect(value);
        onClose();
      }}
      {...rest}
    >
      {children}
    </MenuItem>
  );
};

DropDownItem.displayName = "DropDownItem";
