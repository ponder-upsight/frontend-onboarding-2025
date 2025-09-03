import apiClient from "@/api/apiClient";

export const deleteProductApi = async (id: string) => {
  const response = await apiClient.delete(`/api/v1/products/${id}`);
  return response.data;
};
