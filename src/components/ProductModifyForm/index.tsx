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

interface ProductModifyFormProps {
  initData?: ProductFormValues; // 수정 페이지에서 기존 데이터를 받을 때 사용
}

const ProductAddPage = ({ initData }: ProductModifyFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initData?.name || "",
      description: initData?.description || "",
      stock: initData?.stock || 0,
      thumbnail: initData?.thumbnail,
      detailImages: initData?.detailImages,
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    console.log("Form submitted:", data);
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
                새 상품 등록
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
              <FormControl isInvalid={!!errors.stock}>
                <FormLabel fontSize="sm">재고량</FormLabel>
                <Controller
                  name="stock"
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
                <FormErrorMessage>{errors.stock?.message}</FormErrorMessage>
              </FormControl>
              <ImagePreview
                control={control}
                name="thumbnail"
                label="메인 이미지"
                error={errors.thumbnail?.message as string}
                multiple={false}
              />
              <ImagePreview
                control={control}
                name="detailImages"
                label="상세 이미지"
                error={errors.detailImages?.message as string}
                multiple={true}
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
                상품 등록
              </Button>
            </VStack>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductAddPage;
