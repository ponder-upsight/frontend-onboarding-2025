"use client";

import { Box, Button, Container, Heading, VStack } from "@chakra-ui/react";
import { FormProvider } from "react-hook-form";
import React from "react";
import ContolledInputProvider from "@/lib/react-hook-form/ContolledInputProvider";
import ControlledNumberInput from "@/lib/react-hook-form/ControlledNumberInput";
import { Input, Textarea } from "@chakra-ui/react";
import ImagePreview from "@/lib/react-hook-form/ImagePreview";
import useProductAddForm from "./_hooks/useProdcutAddForm";

const ProductAddForm = () => {
  const { onSubmit, methods } = useProductAddForm();
  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
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
                  새 상품 등록
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
                  label="메인 이미지"
                  multiple={false}
                />

                {/* 상세 이미지 */}
                <ImagePreview
                  name="detail"
                  label="상세 이미지"
                  multiple={true}
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
                  상품 등록
                </Button>
              </VStack>
            </form>
          </Box>
        </Container>
      </FormProvider>
    </Box>
  );
};

export default ProductAddForm;
