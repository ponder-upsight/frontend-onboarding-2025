"use client";

import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import React from "react";
import { productSchema, ProductFormValues } from "@/lib/react-hook-form/schema";
import ImagePreview from "./ImagePreview";
import usePostCreateProduct from "@/api/products/client/usePostCreateProduct";
import { ProductDetailItem } from "@/types/products";
import usePutCreateProduct from "@/api/products/client/usePutCreateProduct";

interface ProductModifyFormProps {
  initData?: ProductDetailItem & { id: string };
}

const ProductModifyForm = ({ initData }: ProductModifyFormProps) => {
  const isAddPage = !initData; // initData가 없으면 추가 페이지로 간주
  // 수정 모드에서 schema validation을 우회하기 위한 더미 파일
  const createDummyFileList = () => {
    if (typeof window === "undefined") return undefined;

    const dummyFile = new File([""], "dummy.jpg", { type: "image/jpeg" });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(dummyFile);
    return dataTransfer.files;
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    mode: "onChange", // 실시간 검증을 위해 추가
    defaultValues: {
      name: initData?.name || "",
      description: initData?.description || "",
      amount: initData?.stock || 0, // stock 필드를 amount로 매핑
      thumbnail: isAddPage ? undefined : createDummyFileList(), // 수정 모드에서는 더미 파일
      detail: undefined, // 파일은 항상 새로 선택해야 함
    },
  });

  const { mutate: postCreateProduct } = usePostCreateProduct();
  const { mutate: putCreateProduct } = usePutCreateProduct();

  const onSubmit = (data: ProductFormValues) => {
    if (isAddPage) {
      // 추가 모드: 썸네일이 필수
      if (!data.thumbnail || data.thumbnail.length === 0) {
        alert("메인 이미지를 선택해주세요.");
        return;
      }

      // 추가 API 데이터 형식
      const addApiData = {
        name: data.name,
        description: data.description,
        amount: data.amount,
        thumbnail: data.thumbnail[0],
        detail: data.detail ? Array.from(data.detail) : [],
      };

      postCreateProduct(addApiData);
    } else {
      // 수정 모드: initData가 있어야 함
      if (!initData?.id) {
        alert("수정할 상품 정보가 없습니다.");
        return;
      }

      // 수정 모드에서는 더미 파일이 아닌 실제 새 파일이 선택되었는지 확인
      const hasNewThumbnail =
        data.thumbnail &&
        data.thumbnail.length > 0 &&
        data.thumbnail[0].name !== "dummy.jpg";

      // 수정 API 데이터 형식
      const modifyApiData = {
        productId: initData.id,
        name: data.name,
        description: data.description,
        stock: data.amount,
        deletedImageIds: [], // 삭제된 이미지 ID들 (추후 구현)
        newThumbnail: hasNewThumbnail ? data.thumbnail[0] : new File([], ""), // 빈 파일이면 변경하지 않음
        newDetailImages: data.detail ? Array.from(data.detail) : [], // 새 상세 이미지들
      };

      putCreateProduct(modifyApiData);
    }
  };

  return (
    <Box width={"100%"}>
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
              <FormControl isInvalid={!!errors.name}>
                <FormLabel fontSize="sm">상품명</FormLabel>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="상품명을 입력해주세요"
                      bg="gray.100"
                      border="none"
                    />
                  )}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.description}>
                <FormLabel fontSize="sm">상품 설명</FormLabel>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="상품 설명을 입력해주세요"
                      bg="gray.100"
                      border="none"
                    />
                  )}
                />
                <FormErrorMessage>
                  {errors.description?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.amount}>
                <FormLabel fontSize="sm">재고</FormLabel>
                <Controller
                  name="amount"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => (
                    <NumberInput
                      {...field}
                      value={value?.toString() || ""}
                      onChange={(valueString) =>
                        onChange(Number(valueString) || 0)
                      }
                      min={0}>
                      <NumberInputField
                        placeholder="0"
                        bg="gray.100"
                        border="none"
                      />
                    </NumberInput>
                  )}
                />
                <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
              </FormControl>
              <ImagePreview
                control={control}
                name="thumbnail"
                label={
                  isAddPage
                    ? "메인 이미지"
                    : "메인 이미지 (변경하려면 새로 선택)"
                }
                error={errors.thumbnail?.message as string}
                multiple={false}
                existingImageUrls={
                  !isAddPage && initData?.thumbnailUrl
                    ? [initData.thumbnailUrl]
                    : []
                }
              />
              <ImagePreview
                control={control}
                name="detail"
                label={
                  isAddPage ? "상세 이미지" : "상세 이미지 (추가하려면 선택)"
                }
                error={errors.detail?.message as string}
                multiple={true}
                existingImageUrls={
                  !isAddPage && initData?.detailFileUrls
                    ? initData.detailFileUrls
                    : []
                }
              />{" "}
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
            </VStack>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductModifyForm;
