import apiClient from "@/api/apiClient";

interface GetProductDetailsApiResponse {
  id: string;
  name: string;
  description: string;
  stock: number;
  createdAt: string;
  thumbnailUrl: string;
  detailFileUrls: string[];
}

export const getProductDetailsApi = async (productId: string): Promise<GetProductDetailsApiResponse> => {
  const response = await apiClient.get(`/api/v1/products/${productId}`);
  return response.data;
};
