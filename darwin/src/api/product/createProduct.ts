import apiClient from "@/api/apiClient";

interface CreateProductApiRequest {
  name: string;
  description: string;
  amount: number;
  thumbnail: File | null;
  detail: File[];
}

export const createProductApi = async (productData: CreateProductApiRequest) => {
  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("amount", productData.amount.toString());

  if (productData.thumbnail) {
    formData.append("thumbnail", productData.thumbnail);
  }

  productData.detail.forEach((file) => {
    formData.append("detail", file);
  });

  const response = await apiClient.post(`/api/v1/products`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};


