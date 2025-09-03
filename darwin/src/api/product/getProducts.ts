import apiClient from "@/api/apiClient";

interface GetProductsApiResponse {
  id: string;
  productName: string;
  thumbnailUrl: string;
  stock: number;
}

export const getProductsApi = async (): Promise<GetProductsApiResponse[]> => {
  const response = await apiClient.get(`/api/v1/products`);
  return response.data.pageResult;
};
