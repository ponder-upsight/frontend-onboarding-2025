import { FC } from "react";

import { Flex, Menu, MenuButton, MenuList } from "@chakra-ui/react";

import { DownGray, UpGray } from "@/assets/icons";

import { TypoGraph } from "../Typography";
import { DropDownItem } from "./DropdownItem";
import { DropDownContext } from "./dropdownContext";

interface DropDownProps {
  selectedValue?: string;
  displayText?: string;
  onSelect: (value: string) => void;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  menuButtonText?: string;
  w?: string;
  children: React.ReactNode;
  variant?: "default" | "outline";
  matchWidth?: boolean;
  hasError?: boolean;
}

const DropDownBase: FC<DropDownProps> = ({
  selectedValue,
  displayText,
  onSelect,
  onOpen,
  onClose,
  isOpen,
  menuButtonText = "Select option",
  w = "200px",
  children,
  variant = "default",
  matchWidth = true,
  hasError = false,
}: DropDownProps) => {
  const isPlaceholder = !selectedValue;

  return (
    <DropDownContext.Provider value={{ selectedValue, onSelect, onClose }}>
      <Menu
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        matchWidth={matchWidth}
        variant={variant}
      >
        <MenuButton w={w} type="button" borderColor={hasError ? "red.400" : "gray.300"}>
          <Flex justify="space-between" align="center">
            <TypoGraph
              textAlign="left"
              variant={isPlaceholder ? "label04" : "label03"}
              color={isPlaceholder ? "gray.700" : "gray.900"}
            >
              {isPlaceholder ? menuButtonText : displayText}
            </TypoGraph>
            {isOpen ? <UpGray width="24px" /> : <DownGray width="24px" />}
          </Flex>
        </MenuButton>
        <MenuList p="4px" minW={w}>
          {children}
        </MenuList>
      </Menu>
    </DropDownContext.Provider>
  );
};

interface DropDownCompoundComponent extends FC<DropDownProps> {
  Item: typeof DropDownItem;
}

export const DropDown = DropDownBase as DropDownCompoundComponent;
DropDown.Item = DropDownItem;
