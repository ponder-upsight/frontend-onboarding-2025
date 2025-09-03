"use client";

import { useRouter } from "next/navigation";

import { ProductDetails } from "@/domain/product/ProductDetails";
import { Box, HStack, VStack } from "@chakra-ui/react";

import { useProductInfo } from "@/app/[lng]/product/[id]/components/ProductInfo/useProductInfo";
import { Button } from "@/app/components/ui/Button";
import { ConfirmModal } from "@/app/components/ui/ConfirmModal";
import { TypoGraph } from "@/app/components/ui/Typography";
import { useI18n } from "@/app/i18n/I18nProvider";

import { EditBlack, MinusGray, PlusGray } from "@/assets/icons";

interface ProductInfoProps {
  id: string;
  productDetails: ProductDetails;
}

const ProductInfo = ({ id, productDetails }: ProductInfoProps) => {
  const { t, lng } = useI18n();
  const router = useRouter();
  const {
    orderConfirmModalState,
    stockQuantity,
    handleOrder,
    handleQuantityChange,
    handleAddToCart,
  } = useProductInfo({
    id,
    productDetails,
  });

  const handleEditProduct = () => {
    router.push(`/${lng}/product/${id}/edit`);
  };

  return (
    <VStack spacing="24px" align="stretch" mb="16px">
      <Box>
        <HStack justify="space-between" align="start" mb="8px">
          <TypoGraph variant="headline01" color="gray.900">
            {productDetails.name}
          </TypoGraph>
          <Button
            variant="outlined"
            leftIcon={<EditBlack />}
            onClick={handleEditProduct}
            px="12px"
            w="128px"
            h="32px"
          >
            {t("edit")}
          </Button>
        </HStack>
        <TypoGraph variant="label05" color="gray.600">
          {productDetails.createdAt}
        </TypoGraph>
      </Box>

      <Box>
        <TypoGraph variant="headline03" color="gray.800" mb="8px">
          {t("productDescription")}
        </TypoGraph>
        <TypoGraph variant="body02" color="gray.700" lineHeight="1.6">
          {productDetails.description}
        </TypoGraph>
      </Box>

      <Box>
        <TypoGraph variant="headline03" color="gray.800" mb="12px">
          {t("stockInfo")}
        </TypoGraph>
        <Box bg="gray.900" p="12px" borderRadius="4px" width="128px" textAlign="center">
          <TypoGraph variant="label03" color="white">
            {t("stock", { count: productDetails.stockQuantity })}
          </TypoGraph>
        </Box>
      </Box>

      {productDetails.stockQuantity > 0 && (
        <>
          <Box>
            <TypoGraph variant="headline03" color="gray.800" mb="12px">
              {t("quantitySelect")}
            </TypoGraph>
            <HStack spacing="0" w="fit-content">
              <Button
                variant="outlined"
                size="sm"
                w="40px"
                h="40px"
                p="0"
                borderRadius="4px 0 0 4px"
                borderRight="none"
                onClick={() => handleQuantityChange(-1)}
                isDisabled={stockQuantity <= 1}
                useTypography={false}
              >
                <MinusGray />
              </Button>
              <Box
                w="60px"
                h="40px"
                border="1px solid"
                borderColor="gray.300"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="white"
              >
                <TypoGraph variant="label03" color="gray.900">
                  {stockQuantity}
                </TypoGraph>
              </Box>
              <Button
                variant="outlined"
                size="sm"
                w="40px"
                h="40px"
                p="0"
                borderRadius="0 4px 4px 0"
                borderLeft="none"
                onClick={() => handleQuantityChange(1)}
                isDisabled={stockQuantity >= productDetails.stockQuantity}
                useTypography={false}
              >
                <PlusGray />
              </Button>
            </HStack>
          </Box>

          <VStack spacing="12px" align="stretch">
            <Button variant="primary" size="lg" w="100%" onClick={handleOrder}>
              {t("order")}
            </Button>
            <Button variant="outlined" size="lg" w="100%" onClick={handleAddToCart}>
              {t("addToCart")}
            </Button>
          </VStack>
        </>
      )}

      {productDetails.stockQuantity === 0 && (
        <Box bg="gray.100" p="16px" borderRadius="8px" textAlign="center">
          <TypoGraph variant="label03" color="gray.600">
            {t("outOfStock")}
          </TypoGraph>
        </Box>
      )}

      <ConfirmModal
        title={t("order")}
        content={t("orderConfirm", {
          name: productDetails.name,
          quantity: stockQuantity,
        })}
        isOpen={orderConfirmModalState.isOpen}
        onClose={orderConfirmModalState.closeModal}
        confirmBtn={t("order")}
        closeBtn={t("cancel")}
        onConfirm={orderConfirmModalState.onConfirm}
      />
    </VStack>
  );
};

export default ProductInfo;
