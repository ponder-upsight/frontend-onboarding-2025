"use client";

import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import React, { useState } from "react";
import { productSchema, ProductFormValues } from "@/lib/react-hook-form/schema";

import usePostCreateProduct from "@/api/products/client/usePostCreateProduct";
import { ProductDetailItem } from "@/types/products";
import usePutModifyProduct from "@/api/products/client/usePutModifyProduct";
import ContolledInputProvider from "@/lib/react-hook-form/ContolledInputProvider";
import ControlledNumberInput from "@/lib/react-hook-form/ControlledNumberInput";
import ImagePreview from "@/lib/react-hook-form/ImagePreview";

interface ProductModifyFormProps {
  initData?: ProductDetailItem & { id: string };
}

const ProductModifyForm = ({ initData }: ProductModifyFormProps) => {
  const isAddPage = !initData; // initData가 없으면 추가 페이지로 간주

  // 삭제된 이미지 URL들을 추적하는 state
  const [deletedImageUrls, setDeletedImageUrls] = useState<string[]>([]);

  // 기존 이미지 삭제 핸들러
  const handleRemoveExistingImage = (url: string) => {
    setDeletedImageUrls((prev) => [...prev, url]);
  };

  // 조건부 validation 함수
  const validateForm = (data: ProductFormValues) => {
    // 추가 모드에서는 thumbnail이 필수
    if (isAddPage && (!data.thumbnail || data.thumbnail.length === 0)) {
      return "메인 이미지를 선택해주세요.";
    }

    // 모든 검증 통과
    return true;
  };

  const method = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: {
      name: initData?.name || "",
      description: initData?.description || "",
      amount: initData?.stock || 0,
      thumbnail: undefined,
      detail: undefined,
    },
  });
  const {
    handleSubmit,
    setError,
    clearErrors,
    formState: { isValid, isSubmitting, isDirty },
  } = method;

  const { mutate: postCreateProduct } = usePostCreateProduct();
  const { mutate: putModifyProduct } = usePutModifyProduct();

  const onSubmit = (data: ProductFormValues) => {
    // 조건부 validation 실행
    const validationResult = validateForm(data);
    if (validationResult !== true) {
      setError("thumbnail", {
        type: "manual",
        message: validationResult,
      });
      return;
    }

    // 이전 에러 제거
    clearErrors("thumbnail");

    if (isAddPage) {
      // 추가 API 데이터 형식
      const addApiData = {
        name: data.name,
        description: data.description,
        amount: data.amount,
        thumbnail: data.thumbnail![0],
        detail: data.detail ? Array.from(data.detail) : [],
      };

      postCreateProduct(addApiData);
    } else {
      // 수정 모드: initData가 있어야 함
      if (!initData?.id) {
        alert("수정할 상품 정보가 없습니다.");
        return;
      }

      // 수정 모드에서는 새 파일이 선택되었는지 확인
      const hasNewThumbnail = data.thumbnail && data.thumbnail.length > 0;

      // 수정 API 데이터 형식
      const modifyApiData = {
        productId: initData.id,
        name: data.name,
        description: data.description,
        stock: data.amount,
        deletedImageIds: [], // 삭제된 이미지 ID들 (추후 구현)
        ...(hasNewThumbnail && { newThumbnail: data.thumbnail[0] }), // 새 썸네일이 있을 때만 포함
        newDetailImages: data.detail ? Array.from(data.detail) : [], // 새 상세 이미지들
      };

      putModifyProduct(modifyApiData);
    }
  };

  return (
    <Box width={"100%"}>
      <FormProvider {...method}>
        {/* Form Content */}
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
                  {isAddPage ? "새 상품 등록" : "상품 수정"}
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

                {/* 이미지 목록 */}
                <ImagePreview
                  name="thumbnail"
                  label={
                    isAddPage
                      ? "메인 이미지"
                      : "메인 이미지 (변경하려면 새로 선택)"
                  }
                  multiple={false}
                  existingImageUrls={
                    !isAddPage &&
                    initData?.thumbnailUrl &&
                    !deletedImageUrls.includes(initData.thumbnailUrl)
                      ? [initData.thumbnailUrl]
                      : []
                  }
                  onRemoveExistingImage={handleRemoveExistingImage}
                />
                <ImagePreview
                  name="detail"
                  label={
                    isAddPage ? "상세 이미지" : "상세 이미지 (추가하려면 선택)"
                  }
                  multiple={true}
                  existingImageUrls={
                    !isAddPage && initData?.detailFileUrls
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
                  bg={isValid ? "primary.500" : "gray.400"}
                  _hover={{ bg: isValid ? "primary.600" : "" }}
                  isLoading={isSubmitting}
                  isDisabled={!isValid}
                  type="submit"
                  size="lg"
                  w="full">
                  {isAddPage ? "상품 등록" : "상품 수정"}
                </Button>
                {/* p태그 */}
                {!isAddPage && !isDirty && (
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

export default ProductModifyForm;
