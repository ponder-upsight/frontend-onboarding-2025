import { publicAxiosInstance } from "@/util/fetchUtil/axionsInstance";

export interface PostPurchaseProductProps {
  productId: string;
  quantity: number;
}

export const postPurchaseProduct = async ({
  productId,
  quantity,
}: PostPurchaseProductProps) => {
  const response = await publicAxiosInstance.post(`/products/${productId}`, {
    quantity,
  });
  return response.data;
};
