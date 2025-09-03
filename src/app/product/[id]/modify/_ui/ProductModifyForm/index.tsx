"use client";

import { Box, Button, Container, Heading, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import {
  productModifySchema,
  ProductModifyFormValues,
} from "@/lib/react-hook-form/schema";

import usePutModifyProduct from "@/api/products/client/usePutModifyProduct";
import ContolledInputProvider from "@/lib/react-hook-form/ContolledInputProvider";
import ControlledNumberInput from "@/lib/react-hook-form/ControlledNumberInput";
import { Input, Textarea } from "@chakra-ui/react";
import ImagePreview from "@/lib/react-hook-form/ImagePreview";
import useGetProduct from "@/api/products/client/useGetProduct";

interface ProductEditFormProps {
  productId: string;
}

const ProductModifyForm = ({ productId }: ProductEditFormProps) => {
  // 삭제된 이미지 URL들을 추적하는 state
  const [deletedImageUrls, setDeletedImageUrls] = useState<string[]>([]);

  const { data: product } = useGetProduct(productId);
  const { name, description, stock, thumbnailUrl, detailFileUrls } =
    product || {};

  // 기존 이미지 삭제 핸들러
  const handleRemoveExistingImage = (url: string) => {
    setDeletedImageUrls((prev) => [...prev, url]);
  };

  const methods = useForm<ProductModifyFormValues>({
    resolver: zodResolver(productModifySchema),
    mode: "onChange",
    defaultValues: {
      name,
      description,
      amount: stock,
      thumbnail: undefined,
      detail: undefined,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = methods;

  const { mutate: putModifyProduct } = usePutModifyProduct();

  const onSubmit = (data: ProductModifyFormValues) => {
    // 새 썸네일이 선택되었는지 확인
    const hasNewThumbnail = data.thumbnail && data.thumbnail.length > 0;

    // 수정 API 데이터 형식
    const modifyApiData = {
      productId,
      name: data.name,
      description: data.description,
      stock: data.amount,
      deletedImageIds: [], // 삭제된 이미지 ID들 (추후 구현)
      ...(hasNewThumbnail &&
        data.thumbnail && { newThumbnail: data.thumbnail[0] }),
      newDetailImages: data.detail ? Array.from(data.detail) : [],
    };

    putModifyProduct(modifyApiData);
  };

  return (
    <Box width={"100%"}>
      <FormProvider {...methods}>
        <Container maxW="container.md" py={{ base: 6, md: 12 }}>
          <Box
            bg="white"
            p={{ base: 6, md: 8 }}
            borderRadius="lg"
            borderWidth="1px"
            shadow="sm">
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={6} align="stretch">
                <Heading size="md" color="primary.500">
                  상품 수정
                </Heading>

                {/* 상품명 */}
                <ContolledInputProvider name="name" label="상품명">
                  <Input
                    placeholder="상품명을 입력해주세요"
                    bg="gray.100"
                    border="none"
                  />
                </ContolledInputProvider>

                {/* 상품 설명*/}
                <ContolledInputProvider name="description" label="상품 설명">
                  <Textarea
                    placeholder="상품 설명을 입력해주세요"
                    bg="gray.100"
                    border="none"
                  />
                </ContolledInputProvider>

                {/* 재고 수량*/}
                <ControlledNumberInput name="amount" label="재고 수량" />

                {/* 메인 이미지 */}
                <ImagePreview
                  name="thumbnail"
                  label="메인 이미지 (변경하려면 새로 선택)"
                  multiple={false}
                  existingImageUrls={
                    thumbnailUrl && !deletedImageUrls.includes(thumbnailUrl)
                      ? [thumbnailUrl]
                      : []
                  }
                  onRemoveExistingImage={handleRemoveExistingImage}
                />

                {/* 상세 이미지 */}
                <ImagePreview
                  name="detail"
                  label="상세 이미지 (추가하려면 선택)"
                  multiple={true}
                  existingImageUrls={
                    detailFileUrls
                      ? detailFileUrls.filter(
                          (url) => !deletedImageUrls.includes(url)
                        )
                      : []
                  }
                  onRemoveExistingImage={handleRemoveExistingImage}
                />

                <Button
                  mt={8}
                  color="white"
                  bg={isDirty || isValid ? "primary.500" : "gray.400"}
                  _hover={{ bg: isValid || isDirty ? "primary.600" : "" }}
                  isLoading={isSubmitting}
                  isDisabled={!isValid || !isDirty}
                  type="submit"
                  size="lg"
                  w="full">
                  상품 수정
                </Button>

                {/* 수정 내용 없음 안내 */}
                {!isDirty && (
                  <Box as="p" color="gray.500" fontSize="sm" textAlign="center">
                    수정된 내용이 없습니다.
                  </Box>
                )}
              </VStack>
            </form>
          </Box>
        </Container>
      </FormProvider>
    </Box>
  );
};

export default ProductModifyForm;
