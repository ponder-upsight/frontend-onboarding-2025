import { Box, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";

const ProductCardSkeleton = () => {
  return (
    // ProductCard와 동일한 컨테이너 스타일 적용
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      bg="white">
      {/* 1. 이미지 영역 스켈레톤 */}
      <Skeleton height="200px" />

      <Box p="6">
        {/* 2. 상품 제목 스켈레톤 */}
        <Skeleton height="24px" width="75%" mb="4" />

        {/* 3. 상품 설명 스켈레톤 */}
        <SkeletonText noOfLines={2} spacing="4" skeletonHeight="3" />

        {/* 4. 재고 및 날짜 스켈레톤 */}
        <Flex justify="space-between" align="center" mt="4">
          <Skeleton height="20px" width="70px" borderRadius="full" />
          <Skeleton height="16px" width="90px" />
        </Flex>

        {/* 5. 상세 보기 버튼 스켈레톤 */}
        <Skeleton height="40px" mt="6" />
      </Box>
    </Box>
  );
};

export default ProductCardSkeleton;
