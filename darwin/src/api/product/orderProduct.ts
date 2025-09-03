import apiClient from "@/api/apiClient";

interface OrderProductApiRequest {
  quantity: number;
}

export const orderProductApi = async (productId: string, orderData: OrderProductApiRequest) => {
  const response = await apiClient.post(`/api/v1/products/${productId}`, orderData);
  return response.data;
};
