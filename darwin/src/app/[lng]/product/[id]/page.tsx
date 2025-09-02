"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { Button } from "@/app/components/ui/Button";
import { TypoGraph } from "@/app/components/ui/Typography";
import { LeftIcon } from "@/assets/icons";
import { useTranslation } from "@/app/i18n/client";
import ImageGallery from "./components/ImageGallery";
import ProductInfo from "./components/ProductInfo";
import { useGetProduct } from "@/api/product/getProduct";
import { LoadingSpinner } from "@/app/components/ui/LoadingSpinner";

type PageProps = {
  params: Promise<{
    lng: string;
    id: string;
  }>;
};

const ProductDetailPage = ({ params }: PageProps) => {
  const [lng, setLng] = useState<string>("");
  const [productId, setProductId] = useState<string>("");
  const router = useRouter();
  const { data: product, isPending } = useGetProduct(productId)
  const { t } = useTranslation(lng);

  useEffect(() => {
    params.then((resolvedParams) => {
      setLng(resolvedParams.lng);
      setProductId(resolvedParams.id);
    });
  }, [params]);

  const handleBackToList = () => {
    router.push(`/${lng}`);
  };

  if (isPending) {
      return (
          <Box minH="100vh" bg="gray.50" pt="128px">
              <Box maxW="1200px" mx="auto" p="32px">
                  <Flex
                    alignItems="center"
                    gap="16px"
                  >
                      <LoadingSpinner size={20} color="#101010" />
                      <TypoGraph variant="headline01" color="gray.800">
                          {t("loading")}
                      </TypoGraph>
                  </Flex>
              </Box>
          </Box>
      )
  }

  if (!product) {
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

        <Grid templateColumns="1fr 1fr" gap="40px" bg="white" borderRadius="8px" p="32px">
          <ImageGallery product={product} lng={lng} />
          <ProductInfo product={product} lng={lng} />
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
