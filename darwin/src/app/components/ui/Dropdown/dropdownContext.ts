import { createContext, useContext } from "react";

interface DropDownContextProps {
  selectedValue?: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

export const DropDownContext = createContext<DropDownContextProps | undefined>(undefined);

export const useDropDownContext = () => {
  const ctx = useContext(DropDownContext);
  if (!ctx) throw new Error("DropDown.Item must be used within DropDown");
  return ctx;
};
