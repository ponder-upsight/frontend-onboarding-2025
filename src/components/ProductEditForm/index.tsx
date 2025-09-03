"use client";

import {
  Box,
  Button,
  Container,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import React, { useState, useMemo } from "react";
import { productSchema, ProductFormValues } from "@/lib/react-hook-form/schema";
import ImagePreview from "../ProductModifyForm/ImagePreview";
import { ProductDetailItem } from "@/types/products";
import usePutModifyProduct from "@/api/products/client/usePutModifyProduct";
import ContolledInputProvider from "@/lib/react-hook-form/ContolledInputProvider";
import ControlledNumberInput from "@/lib/react-hook-form/ControlledNumberInput";
import { Input, Textarea } from "@chakra-ui/react";

interface ProductEditFormProps {
  initData: ProductDetailItem & { id: string };
}

const ProductEditForm = ({ initData }: ProductEditFormProps) => {
  // 삭제된 이미지 URL들을 추적하는 state
  const [deletedImageUrls, setDeletedImageUrls] = useState<string[]>([]);

  // 기존 이미지 삭제 핸들러
  const handleRemoveExistingImage = (url: string) => {
    setDeletedImageUrls((prev) => [...prev, url]);
  };

  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: {
      name: initData.name || "",
      description: initData.description || "",
      amount: initData.stock || 0,
      thumbnail: undefined,
      detail: undefined,
    },
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting, isDirty },
  } = methods;

  // 수정 모드에서는 thumbnail 에러 제외하고 검증
  const watchedValues = watch();
  const customIsValid = useMemo(() => {
    const hasRequiredFields = 
      watchedValues.name?.trim() && 
      watchedValues.description?.trim() && 
      typeof watchedValues.amount === 'number' && 
      watchedValues.amount >= 0;
    
    return hasRequiredFields;
  }, [watchedValues]);

  const { mutate: putModifyProduct } = usePutModifyProduct();

  const onSubmit = (data: ProductFormValues) => {
    // 새 썸네일이 선택되었는지 확인
    const hasNewThumbnail = data.thumbnail && data.thumbnail.length > 0;

    // 수정 API 데이터 형식
    const modifyApiData = {
      productId: initData.id,
      name: data.name,
      description: data.description,
      stock: data.amount,
      deletedImageIds: [], // 삭제된 이미지 ID들 (추후 구현)
      ...(hasNewThumbnail && { newThumbnail: data.thumbnail[0] }),
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
                    initData?.thumbnailUrl &&
                    !deletedImageUrls.includes(initData.thumbnailUrl)
                      ? [initData.thumbnailUrl]
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
                    initData?.detailFileUrls
                      ? initData.detailFileUrls.filter(
                          (url) => !deletedImageUrls.includes(url)
                        )
                      : []
                  }
                  onRemoveExistingImage={handleRemoveExistingImage}
                />

                <Button
                  mt={8}
                  color="white"
                  bg={customIsValid ? "primary.500" : "gray.400"}
                  _hover={{ bg: customIsValid ? "primary.600" : "" }}
                  isLoading={isSubmitting}
                  isDisabled={!customIsValid}
                  type="submit"
                  size="lg"
                  w="full">
                  상품 수정
                </Button>
                
                {/* 수정 내용 없음 안내 */}
                {!isDirty && (
                  <Box as="p" color="red.500" fontSize="sm" textAlign="center">
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

export default ProductEditForm;
