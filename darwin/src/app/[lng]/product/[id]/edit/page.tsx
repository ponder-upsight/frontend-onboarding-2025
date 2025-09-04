"use client";

/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { ProductService } from "@/service/product/ProductService";
import { Box, Flex, FormControl, VStack } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { TypoGraph } from "@/components/ui/Typography";

import FileUploadSection from "@/app/[lng]/components/File/FileUploadSection";
import CurrentImagesSection from "@/app/[lng]/product/[id]/edit/components/CurrentImagesSection/CurrentImagesSection";
import { useI18n } from "@/app/i18n/I18nProvider";

interface ProductFormValues {
  name: string;
  description: string;
  stockQuantity: number;
  isThumbnailUploaded: boolean;
  isDetailImagesUploaded: boolean;
}

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const ProductEditPage = ({ params }: PageProps) => {
  const { t, lng } = useI18n();
  const router = useRouter();
  const [productId, setProductId] = useState<string>("");
  const getProductDetails = ProductService.useGetProductDetails(productId);
  const updateProduct = ProductService.useUpdateProduct(productId);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newThumbnailImage, setNewThumbnailImage] = useState<File[]>([]);
  const [newDetailImages, setNewDetailImages] = useState<File[]>([]);
  const isFormInitialized = useRef(false);

  useEffect(() => {
    params.then((resolvedParams) => {
      setProductId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    register("isThumbnailUploaded");
    register("isDetailImagesUploaded");
  }, [register]);

  useEffect(() => {
    if (getProductDetails.data && !isFormInitialized.current) {
      const productData = getProductDetails.data;
      reset({
        name: productData.name,
        description: productData.description,
        stockQuantity: productData.stockQuantity,
        isThumbnailUploaded: false,
        isDetailImagesUploaded: false,
      });
      isFormInitialized.current = true;
    }
  }, [getProductDetails.data, reset]);

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);

    await updateProduct.mutateAsync({
      name: data.name,
      description: data.description,
      stockQuantity: data.stockQuantity,
      deletedImageIds: [],
      newThumbnailImage: newThumbnailImage[0] || null,
      newDetailImages: newDetailImages,
    });
    router.push(`/${lng}/product/${productId}`);

    setIsSubmitting(false);
  };

  const handleNewThumbnailChange = (files: File[]) => {
    setNewThumbnailImage(files);
    setValue("isThumbnailUploaded", files.length > 0);
    trigger("isThumbnailUploaded");
  };

  const handleNewDetailImagesChange = (files: File[]) => {
    setNewDetailImages(files);
    setValue("isDetailImagesUploaded", files.length > 0);
    trigger("isDetailImagesUploaded");
  };

  const handleBackToDetail = () => {
    router.push(`/${lng}/product/${productId}`);
  };

  if (getProductDetails.isPending) {
    return (
      <Box minH="100vh" bg="gray.50" pt="128px">
        <Box maxW="600px" mx="auto" p="32px">
          <Flex alignItems="center" gap="16px">
            <LoadingSpinner size={20} color="#101010" />
            <TypoGraph variant="headline01" color="gray.800">
              {t("ui.loading")}
            </TypoGraph>
          </Flex>
        </Box>
      </Box>
    );
  }

  if (!getProductDetails.data) {
    return (
      <Box minH="100vh" bg="gray.50" pt="128px">
        <Box maxW="600px" mx="auto" p="32px">
          <TypoGraph variant="headline01" color="gray.500">
            {t("product.validation.productNotFound")}
          </TypoGraph>
        </Box>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50" pt="128px">
      <Box maxW="600px" mx="auto" p="32px">
        <Box css={formContainer}>
          <Flex justify="space-between" align="center" mb="32px">
            <TypoGraph variant="headline02" color="gray.900">
              {t("product.edit.pageTitle")}
            </TypoGraph>
            <Button variant="ghost" size="sm" onClick={handleBackToDetail}>
              {t("ui.cancel")}
            </Button>
          </Flex>

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing="24px" align="stretch">
              <FormControl>
                <TypoGraph variant="body01" mb="8px" color="gray.900">
                  {t("product.registration.name")}
                </TypoGraph>
                <Input
                  {...register("name", { required: t("product.validation.required") })}
                  placeholder={t("product.registration.namePlaceholder")}
                  hasError={!!errors.name}
                  errorText={errors.name?.message}
                  height="48px"
                />
              </FormControl>

              <FormControl>
                <TypoGraph variant="body01" mb="8px" color="gray.900">
                  {t("product.registration.description")}
                </TypoGraph>
                <Input
                  {...register("description", {
                    required: t("product.validation.required"),
                  })}
                  placeholder={t("product.registration.descriptionPlaceholder")}
                  hasError={!!errors.description}
                  errorText={errors.description?.message}
                  height="48px"
                />
              </FormControl>

              <FormControl>
                <TypoGraph variant="body01" mb="8px" color="gray.900">
                  {t("product.registration.stockQuantity")}
                </TypoGraph>
                <Input
                  {...register("stockQuantity", {
                    required: t("product.validation.required"),
                    min: { value: 0, message: t("product.validation.stockRequired") },
                  })}
                  type="number"
                  placeholder="0"
                  hasError={!!errors.stockQuantity}
                  errorText={errors.stockQuantity?.message}
                  height="48px"
                />
              </FormControl>

              <FormControl>
                <CurrentImagesSection
                  title={t("product.registration.image")}
                  imageUrls={[getProductDetails.data.thumbnailUrl]}
                  multiple={false}
                />
                <Box mt="16px">
                  <FileUploadSection
                    title={t("product.edit.newImages")}
                    buttonText={t("product.registration.imageUpload")}
                    onFileChange={handleNewThumbnailChange}
                    multiple={false}
                    hasError={!!errors.isThumbnailUploaded}
                    errorText={errors.isThumbnailUploaded?.message}
                  />
                </Box>
              </FormControl>

              <FormControl>
                <CurrentImagesSection
                  title={t("product.detail.detailImage")}
                  imageUrls={getProductDetails.data.detailImagesUrl}
                  multiple={true}
                />
                <Box mt="16px">
                  <FileUploadSection
                    title={t("product.edit.newImages")}
                    buttonText={t("product.registration.imageUpload")}
                    onFileChange={handleNewDetailImagesChange}
                    multiple={true}
                    hasError={!!errors.isDetailImagesUploaded}
                    errorText={errors.isDetailImagesUploaded?.message}
                  />
                </Box>
              </FormControl>

              <Flex justify="center" mt="32px" gap="16px">
                <Button
                  variant="outlined"
                  w="100%"
                  h="44px"
                  onClick={handleBackToDetail}
                  disabled={isSubmitting}
                >
                  {t("ui.cancel")}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  w="100%"
                  h="44px"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {t("product.edit.update")}
                </Button>
              </Flex>
            </VStack>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductEditPage;

const formContainer = css`
  padding: 32px;
  margin: 0 auto;
  border: 2px solid #eaecf1;
  box-shadow: 0px 1px 2px 2px rgba(195, 195, 195, 0.1);
  border-radius: 8px;
  background-color: #fff;
`;
