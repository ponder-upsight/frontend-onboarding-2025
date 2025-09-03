import apiClient from "@/api/apiClient";

interface UpdateProductApiRequest {
  name: string;
  description: string;
  stock: number;
  deletedImageIds: string[];
  newThumbnail: File | null;
  newDetailImages: File[];
}

export const updateProductApi = async (
  productId: string,
  productData: UpdateProductApiRequest
) => {
  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("stock", productData.stock.toString());

  productData.deletedImageIds.forEach((id) => {
    formData.append("deletedImageIds", id);
  });

  if (productData.newThumbnail) {
    formData.append("newThumbnail", productData.newThumbnail);
  }

  productData.newDetailImages.forEach((file) => {
    formData.append("newDetailImages", file);
  });

  const response = await apiClient.put(`/api/v1/products/${productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
