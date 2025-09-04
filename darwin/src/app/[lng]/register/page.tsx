"use client";

/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { ProductService } from "@/service/product/ProductService";
import { Box, Flex, FormControl, VStack } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TypoGraph } from "@/components/ui/Typography";
import { useI18n } from "@/app/i18n/I18nProvider";

import FileUploadSection from "../components/File/FileUploadSection";

interface ProductFormValues {
  name: string;
  description: string;
  stockQuantity: number;
  isThumbnailUploaded: boolean;
  isDetailImagesUploaded: boolean;
}

const INITIAL_FORM: ProductFormValues = {
  name: "",
  description: "",
  stockQuantity: 0,
  isThumbnailUploaded: false,
  isDetailImagesUploaded: false,
};

const RegisterPage = () => {
  const { t, lng } = useI18n();
  const router = useRouter();
  const createProduct = ProductService.useCreateProduct();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: INITIAL_FORM,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState<File[]>([]);
  const [detailImages, setDetailImages] = useState<File[]>([]);

  useEffect(() => {
    register("isThumbnailUploaded", { required: t("imageRequired") });
    register("isDetailImagesUploaded", { required: t("imageRequired") });
  }, [register, t]);

  const onSubmit = useCallback(
    async (data: ProductFormValues) => {
      setIsSubmitting(true);

      try {
        await createProduct.mutateAsync({
          name: data.name,
          description: data.description,
          stockQuantity: data.stockQuantity,
          thumbnailImage: thumbnailImage[0],
          detailImages: detailImages,
        });
        router.push(`/${lng}`);
      } catch (error) {
        console.error("Product registration failed:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [lng, router, thumbnailImage, detailImages, createProduct]
  );

  const handleMainImageChange = useCallback(
    (files: File[]) => {
      setThumbnailImage(files);
      setValue("isThumbnailUploaded", files.length > 0);
      trigger("isThumbnailUploaded");
    },
    [setValue, trigger]
  );

  const handleDetailImagesChange = useCallback(
    (files: File[]) => {
      setDetailImages(files);
      setValue("isDetailImagesUploaded", files.length > 0);
      trigger("isDetailImagesUploaded");
    },
    [setValue, trigger]
  );

  return (
    <Box minH="100vh" bg="gray.50" pt="128px">
      <Box maxW="600px" mx="auto" p="32px">
        <Box css={formContainer}>
          <TypoGraph variant="headline02" mb="32px" color="gray.900">
            {t("productRegistration")}
          </TypoGraph>

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing="24px" align="stretch">
              <FormControl>
                <TypoGraph variant="body01" mb="8px" color="gray.900">
                  {t("productName")}
                </TypoGraph>
                <Input
                  {...register("name", { required: t("required") })}
                  placeholder={t("productNamePlaceholder")}
                  hasError={!!errors.name}
                  errorText={errors.name?.message}
                  height="48px"
                />
              </FormControl>

              <FormControl>
                <TypoGraph variant="body01" mb="8px" color="gray.900">
                  {t("description")}
                </TypoGraph>
                <Input
                  {...register("description", { required: t("required") })}
                  placeholder={t("descriptionPlaceholder")}
                  hasError={!!errors.description}
                  errorText={errors.description?.message}
                  height="48px"
                />
              </FormControl>

              <FormControl>
                <TypoGraph variant="body01" mb="8px" color="gray.900">
                  {t("stockQuantity")}
                </TypoGraph>
                <Input
                  {...register("stockQuantity", {
                    required: t("required"),
                    min: { value: 0, message: t("stockRequired") },
                  })}
                  type="number"
                  placeholder="0"
                  hasError={!!errors.stockQuantity}
                  errorText={errors.stockQuantity?.message}
                  height="48px"
                />
              </FormControl>

              <FormControl>
                <FileUploadSection
                  {...register("isThumbnailUploaded", { required: t("imageRequired") })}
                  title={t("productImage")}
                  buttonText={t("imageUpload")}
                  onFileChange={handleMainImageChange}
                  multiple={false}
                  hasError={!!errors.isThumbnailUploaded}
                  errorText={errors.isThumbnailUploaded?.message}
                />
              </FormControl>

              <FormControl>
                <FileUploadSection
                  {...register("isDetailImagesUploaded", {
                    required: t("imageRequired"),
                  })}
                  title={t("detailImage")}
                  buttonText={t("imageUpload")}
                  onFileChange={handleDetailImagesChange}
                  multiple={true}
                  hasError={!!errors.isDetailImagesUploaded}
                  errorText={errors.isDetailImagesUploaded?.message}
                />
              </FormControl>

              <Flex justify="center" mt="32px">
                <Button
                  type="submit"
                  variant="primary"
                  w="100%"
                  h="44px"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {t("register")}
                </Button>
              </Flex>
            </VStack>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;

const formContainer = css`
  padding: 32px;
  margin: 0 auto;
  border: 2px solid #eaecf1;
  box-shadow: 0px 1px 2px 2px rgba(195, 195, 195, 0.1);
  border-radius: 8px;
  background-color: #fff;
`;
