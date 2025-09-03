"use client";

import { Box, HStack, VStack } from "@chakra-ui/react";

import { ProductDetails } from "@/api/product/getProduct";

import { useProductInfo } from "@/app/[lng]/product/[id]/components/ProductInfo/useProductInfo";
import { Button } from "@/app/components/ui/Button";
import { ConfirmModal } from "@/app/components/ui/ConfirmModal";
import { TypoGraph } from "@/app/components/ui/Typography";
import { useI18n } from "@/app/i18n/I18nProvider";

import { MinusGray, PlusGray } from "@/assets/icons";

interface ProductInfoProps {
  id: string;
  productDetails: ProductDetails;
}

const ProductInfo = ({ id, productDetails }: ProductInfoProps) => {
  const { t } = useI18n();
  const {
    orderConfirmModalStore,
    quantity,
    handleOrder,
    handleQuantityChange,
    handleAddToCart,
  } = useProductInfo({
    id,
    productDetails,
  });

  return (
    <VStack spacing="24px" align="stretch" mb="16px">
      <Box>
        <TypoGraph variant="headline01" color="gray.900" mb="8px">
          {productDetails.name}
        </TypoGraph>
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
            {t("stock", { count: productDetails.stock })}
          </TypoGraph>
        </Box>
      </Box>

      {productDetails.stock > 0 && (
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
                isDisabled={quantity <= 1}
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
                  {quantity}
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
                isDisabled={quantity >= productDetails.stock}
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

      {productDetails.stock === 0 && (
        <Box bg="gray.100" p="16px" borderRadius="8px" textAlign="center">
          <TypoGraph variant="label03" color="gray.600">
            {t("outOfStock")}
          </TypoGraph>
        </Box>
      )}

      <ConfirmModal
        title={t("order")}
        content={t("orderConfirm", { name: productDetails.name, quantity: quantity })}
        isOpen={orderConfirmModalStore.isOpen}
        onClose={orderConfirmModalStore.closeModal}
        confirmBtn={t("order")}
        closeBtn={t("cancel")}
        onConfirm={orderConfirmModalStore.onConfirm}
      />
    </VStack>
  );
};

export default ProductInfo;
