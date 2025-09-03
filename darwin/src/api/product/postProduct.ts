import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient from "@/api/apiClient";

export interface PostProductRequest {
  name: string;
  description: string;
  amount: number;
  thumbnail: File | null;
  detail: File[];
}

const postProduct = async (productData: PostProductRequest) => {
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

export const usePostProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<null, Error, PostProductRequest>({
    mutationFn: postProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: () => {},
  });
};
