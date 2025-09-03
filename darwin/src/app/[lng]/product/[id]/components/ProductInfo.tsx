"use client";

import { useState } from "react";
import { Box, VStack, HStack } from "@chakra-ui/react";
import { Button } from "@/app/components/ui/Button";
import { TypoGraph } from "@/app/components/ui/Typography";
import { MinusGray, PlusGray } from "@/assets/icons";
import { toast } from "react-toastify";
import { SuccessToast } from "@/app/components/ui/Toast";
import { ConfirmModal } from "@/app/components/ui/ConfirmModal";
import { useModalStore } from "@/store/useModalStore";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import { ProductDetails } from "@/api/product/getProduct";

interface ProductInfoProps {
  product: ProductDetails;
  lng: string;
}

const ProductInfo = ({ product, lng }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const { onConfirm, isOpen, openModal, closeModal } = useModalStore();
  const router = useRouter();
  const { t } = useTranslation(lng);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleOrder = () => {
    openModal(handleOrderConfirm);
  };

  const handleOrderConfirm = () => {
    toast(SuccessToast, {
      data: { title: t("orderComplete") },
      position: "top-center",
      autoClose: 3000,
    });
    router.push(`/${lng}`);
  };

  const handleAddToCart = () => {
    toast(SuccessToast, {
      data: { title: t("addToCartSuccess", { name: product.name, quantity: quantity }) },
      position: "top-center",
      autoClose: 3000,
    });
  };

  return (
    <VStack spacing="24px" align="stretch" mb="16px">
      <Box>
        <TypoGraph variant="headline01" color="gray.900" mb="8px">
          {product.name}
        </TypoGraph>
        <TypoGraph variant="label05" color="gray.600">
          {product.createdAt}
        </TypoGraph>
      </Box>

      <Box>
        <TypoGraph variant="headline03" color="gray.800" mb="8px">
          {t("productDescription")}
        </TypoGraph>
        <TypoGraph variant="body02" color="gray.700" lineHeight="1.6">
          {product.description}
        </TypoGraph>
      </Box>

      <Box>
        <TypoGraph variant="headline03" color="gray.800" mb="12px">
          {t("stockInfo")}
        </TypoGraph>
        <Box bg="gray.900" p="12px" borderRadius="4px" width="128px" textAlign="center">
          <TypoGraph variant="label03" color="white">
            {t("stock", { count: product.stock })}
          </TypoGraph>
        </Box>
      </Box>

      {product.stock > 0 && (
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
                isDisabled={quantity >= product.stock}
                useTypography={false}
              >
                <PlusGray />
              </Button>
            </HStack>
          </Box>

          <VStack spacing="12px" align="stretch">
            <Button
              variant="primary"
              size="lg"
              w="100%"
              onClick={handleOrder}
            >
              {t("order")}
            </Button>
            <Button
              variant="outlined"
              size="lg"
              w="100%"
              onClick={handleAddToCart}
            >
              {t("addToCart")}
            </Button>
          </VStack>
        </>
      )}

      {product.stock === 0 && (
        <Box bg="gray.100" p="16px" borderRadius="8px" textAlign="center">
          <TypoGraph variant="label03" color="gray.600">
            {t("outOfStock")}
          </TypoGraph>
        </Box>
      )}

      <ConfirmModal
         title={t("order")}
         content={t("orderConfirm", { name: product.name, quantity: quantity })}
         isOpen={isOpen}
         onClose={closeModal}
         confirmBtn={t("order")}
         closeBtn={t("cancel")}
         onConfirm={onConfirm}
       />
    </VStack>
  );
};

export default ProductInfo;
