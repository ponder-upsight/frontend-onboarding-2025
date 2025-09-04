import { Button, HStack, IconButton, useTheme } from "@chakra-ui/react";

import { LeftIcon, RightIcon } from "@/assets/icons";

interface PaginationProps {
  currentPage: number;
  // totalPages: number;
  onPageChange: (page: number) => void;
  totalItemsCount: number;
  itemsCountPerPage: number;
}

export const Pagination = ({
  currentPage,
  onPageChange,
  totalItemsCount,
  itemsCountPerPage,
}: PaginationProps) => {
  const theme = useTheme();

  const totalPages = Math.ceil(totalItemsCount / itemsCountPerPage);
  const pageRange = 10; // 한 번에 보여줄 페이지 수
  const currentGroup = Math.floor((currentPage - 1) / pageRange);
  const startPage = currentGroup * pageRange + 1;
  const endPage = Math.min(startPage + pageRange - 1, totalPages);

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <HStack spacing={theme.space["16"]}>
      <IconButton
        aria-label="Previous"
        size="sm"
        bg=""
        icon={<LeftIcon />}
        _hover={{
          bg: "blue.200", // Button과 동일한 hover 색상
          color: "blue.700",
        }}
        isDisabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          bg={page === currentPage ? theme.colors.blue[200] : ""}
          color={page === currentPage ? theme.colors.blue[700] : theme.colors.grey_black}
          fontSize="12px"
          fontWeight="600"
          size="pagination"
        >
          {page}
        </Button>
      ))}
      <IconButton
        aria-label="Next"
        size="sm"
        bg=""
        icon={<RightIcon />}
        _hover={{
          bg: "blue.200", // Button과 동일한 hover 색상
          color: "blue.700",
        }}
        isDisabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </HStack>
  );
};
