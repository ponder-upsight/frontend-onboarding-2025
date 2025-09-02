import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const toggle = defineStyle({
  // --- 기본 상태 (미선택 시) ---
  border: "1px solid",
  borderColor: "primary.500",
  color: "primary.500",
  bg: "transparent",
  _hover: {
    bg: "primary.50",
  },
  _active: {
    bg: "primary.100",
  },

  // --- isSelected={true} 또는 aria-selected="true"일 때 적용될 스타일 (선택 시) ---
  _selected: {
    bg: "primary.500",
    color: "white",
    borderColor: "primary.500 ", // 테두리 색상도 유지하여 일관성 확보
    _hover: {
      bg: "primary.600", // 선택된 상태에서의 호버 효과
    },
  },

  // --- 비활성화 상태 ---
  _disabled: {
    borderColor: "gray.300",
    color: "gray.300",
    cursor: "not-allowed",
    bg: "transparent",
    _hover: {
      bg: "transparent",
    },
  },
});

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    borderRadius: "md",
    fontWeight: "semibold",
    // 키보드 포커스 시 아웃라인 스타일
    _focusVisible: {
      boxShadow: "outline",
    },
  },
  sizes: {
    md: {
      h: 10,
      minW: 10,
      fontSize: "md",
      px: 4,
    },
    lg: {
      h: 12,
      minW: 12,
      fontSize: "lg",
      px: 6,
    },
  },
  variants: {
    toggle,
  },
});
