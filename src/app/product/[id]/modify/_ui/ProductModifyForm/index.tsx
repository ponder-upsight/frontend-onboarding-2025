"use client";

import { Box, Button, Container, Heading, VStack } from "@chakra-ui/react";
import { FormProvider } from "react-hook-form";
import React from "react";

import ContolledInputProvider from "@/lib/react-hook-form/ContolledInputProvider";
import ControlledNumberInput from "@/lib/react-hook-form/ControlledNumberInput";
import { Input, Textarea } from "@chakra-ui/react";
import ImagePreview from "@/lib/react-hook-form/ImagePreview";
import useProductModifyForm from "./_hooks/useProuctModifyForm";
import {
  ProductModifyFormValues,
  productModifySchemaKey,
} from "@/lib/react-hook-form/schema/productModifySchema";

interface ProductEditFormProps {
  productId: string;
}

const ProductModifyForm = ({ productId }: ProductEditFormProps) => {
  const { onSubmit, methods, product } = useProductModifyForm({ productId });
  const { thumbnailUrl, detailFileUrls } = product || {};
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
  } = methods;

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
                <ContolledInputProvider
                  name={productModifySchemaKey.name}
                  label="상품명">
                  <Input
                    placeholder="상품명을 입력해주세요"
                    bg="gray.100"
                    border="none"
                  />
                </ContolledInputProvider>

                {/* 상품 설명*/}
                <ContolledInputProvider
                  name={productModifySchemaKey.description}
                  label="상품 설명">
                  <Textarea
                    placeholder="상품 설명을 입력해주세요"
                    bg="gray.100"
                    border="none"
                  />
                </ContolledInputProvider>

                {/* 재고 수량*/}
                <ControlledNumberInput
                  name={productModifySchemaKey.amount}
                  label="재고 수량"
                />

                {/* 메인 이미지 */}
                <ImagePreview<ProductModifyFormValues>
                  name={
                    productModifySchemaKey.thumbnail as keyof ProductModifyFormValues
                  }
                  label="메인 이미지 (변경하려면 새로 선택)"
                  multiple={false}
                  existingImageUrls={thumbnailUrl ? [thumbnailUrl] : []}
                  deletedImageUrlsFieldName="deletedImageUrls"
                />

                {/* 상세 이미지 */}
                <ImagePreview<ProductModifyFormValues>
                  name={
                    productModifySchemaKey.detail as keyof ProductModifyFormValues
                  }
                  label="상세 이미지 (추가하려면 선택)"
                  multiple={true}
                  existingImageUrls={detailFileUrls || []}
                  deletedImageUrlsFieldName="deletedImageUrls"
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
