"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Box, Flex } from "@chakra-ui/react";

import { Button } from "@/app/components/ui/Button";
import { LoadingSpinner } from "@/app/components/ui/LoadingSpinner";
import { TypoGraph } from "@/app/components/ui/Typography";
import { useI18n } from "@/app/i18n/I18nProvider";

import { LeftIcon } from "@/assets/icons";

import ImageGallery from "./components/ImageGallery/ImageGallery";
import ProductInfo from "./components/ProductInfo/ProductInfo";
import {useProduct} from "@/domain/product/useProduct";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const ProductDetailPage = ({ params }: PageProps) => {
  const [productId, setProductId] = useState<string>("");
  const router = useRouter();
  const { useGetProductDetails } = useProduct();
  const getProductDetails = useGetProductDetails(productId);
  const { t, lng } = useI18n();

  useEffect(() => {
    params.then((resolvedParams) => {
      setProductId(resolvedParams.id);
    });
  }, [params]);

  const handleBackToList = () => {
    router.push(`/${lng}`);
  };

  if (getProductDetails.isPending) {
    return (
      <Box minH="100vh" bg="gray.50" pt="128px">
        <Box maxW="1200px" mx="auto" p="32px">
          <Flex alignItems="center" gap="16px">
            <LoadingSpinner size={20} color="#101010" />
            <TypoGraph variant="headline01" color="gray.800">
              {t("loading")}
            </TypoGraph>
          </Flex>
        </Box>
      </Box>
    );
  }

  if (!getProductDetails.data) {
    return (
      <Box minH="100vh" bg="gray.50" pt="128px">
        <Box maxW="1200px" mx="auto" p="32px">
          <TypoGraph variant="headline01" color="gray.500">
            {t("productNotFound")}
          </TypoGraph>
        </Box>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50" pt="128px">
      <Box maxW="1200px" mx="auto" p="32px">
        <Button
          variant="ghost"
          size="lg"
          leftIcon={<LeftIcon />}
          onClick={handleBackToList}
          mb="24px"
          p="8px 16px"
        >
          {t("backToList")}
        </Button>

        <Box
          display={{ base: "block", md: "flex" }}
          w="100%"
          gap="40px"
          bg="white"
          borderRadius="8px"
          p="32px"
        >
          <Box flex="1">
            <ProductInfo id={productId} productDetails={getProductDetails.data} />
          </Box>

          <Box flex="1">
            <ImageGallery
              images={[
                getProductDetails.data.thumbnailUrl,
                ...getProductDetails.data.detailImagesUrl
              ].map((url) => ({
                url,
                name: getProductDetails.data.name,
              }))}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
