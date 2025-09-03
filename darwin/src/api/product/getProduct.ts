import { useQuery } from "@tanstack/react-query";

import apiClient from "@/api/apiClient";

export interface ProductDetails {
  id: string;
  name: string;
  description: string;
  stock: number;
  createdAt: string;
  thumbnailUrl: string;
  detailFileUrls: string[];
}

const getProduct = async (productId: string) => {
  const response = await apiClient.get(`/api/v1/products/${productId}`);
  return response.data;
};

export const useGetProduct = (productId: string) => {
  return useQuery<ProductDetails>({
    queryKey: ["productId", productId],
    queryFn: () => {
      return getProduct(productId);
    },
    enabled: !!productId,
  });
};
