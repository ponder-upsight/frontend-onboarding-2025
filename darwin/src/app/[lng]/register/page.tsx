"use client";

/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useTranslation } from "@/app/i18n/client";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { TypoGraph } from "@/app/components/ui/Typography";
import { Box, Flex, VStack, FormControl } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { usePostProduct } from "@/api/ProductApi/postProduct";

import FileUploadSection from "./components/FileUploadSection";

interface ProductFormValues {
  name: string;
  description: string;
  stock: number;
  mainImage: boolean;
  detailImages: boolean;
}

const INITIAL_FORM: ProductFormValues = {
  name: "",
  description: "",
  stock: 0,
  mainImage: false,
  detailImages: false,
};

type PageProps = {
  params: Promise<{
    lng: string;
  }>;
};

const RegisterPage = ({ params }: PageProps) => {
  const [lng, setLng] = useState<string>("");
  const { t, i18n, ready } = useTranslation(lng);
  const router = useRouter();
  const postProductMutation = usePostProduct();

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
  const [mainImages, setMainImages] = useState<File[]>([]);
  const [detailImages, setDetailImages] = useState<File[]>([]);

  useEffect(() => {
    params.then((resolvedParams) => {
      setLng(resolvedParams.lng);
    });
  }, [params]);

  useEffect(() => {
    register("mainImage", { required: t("imageRequired") });
    register("detailImages");
  }, [register]);

  const onSubmit = useCallback(
    async (data: ProductFormValues) => {
      setIsSubmitting(true);
      
      try {
        const mainImageBase64 = mainImages.length > 0 
          ? await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.readAsDataURL(mainImages[0]);
            })
          : "";
        
        const detailImagesBase64 = await Promise.all(
          detailImages.map(file => 
            new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.readAsDataURL(file);
            })
          )
        );
        
        const productData = {
          name: data.name,
          description: data.description,
          stock: data.stock,
          imageUrl: mainImageBase64,
          detailImageUrls: detailImagesBase64,
        };
        
        await postProductMutation.mutateAsync(productData);
        router.push(`/${lng}`);
      } catch (error) {
        console.error("Product registration failed:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [lng, router, mainImages, detailImages, postProductMutation]
  );

  const handleMainImageChange = useCallback((files: File[]) => {
    setMainImages(files);
    setValue("mainImage", files.length > 0);
    trigger("mainImage");
  }, [setValue, trigger]);

  const handleDetailImagesChange = useCallback((files: File[]) => {
    setDetailImages(files);
    setValue("detailImages", files.length > 0);
    trigger("detailImages");
  }, [setValue, trigger]);

  if (!ready || !lng) {
    return <Box minH="100vh" bg="gray.50" pt="128px" />;
  }

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
                  {...register("stock", { 
                    required: t("required"),
                    min: { value: 0, message: t("stockRequired") }
                  })}
                  type="number"
                  placeholder="0"
                  hasError={!!errors.stock}
                  errorText={errors.stock?.message}
                  height="48px"
                />
              </FormControl>

              <FormControl>
                <FileUploadSection
                  {...register("mainImage", { required: t("imageRequired") })}
                  title={t("productImage")}
                  buttonText={t("imageUpload")}
                  onFileChange={handleMainImageChange}
                  selectedFiles={mainImages}
                  multiple={false}
                  hasError={!!errors.mainImage}
                  errorText={errors.mainImage?.message}
                  lng={lng}
                />
              </FormControl>

              <FormControl>
                <FileUploadSection
                  {...register("detailImages", { required: t("imageRequired") })}
                  title={t("detailImage")}
                  buttonText={t("imageUpload")}
                  onFileChange={handleDetailImagesChange}
                  selectedFiles={detailImages}
                  multiple={true}
                  hasError={!!errors.detailImages}
                  errorText={errors.detailImages?.message}
                  lng={lng}
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
