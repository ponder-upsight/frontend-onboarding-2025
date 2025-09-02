import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient from "@/api/apiClient";

export interface PutProductRequest {
    name: string;
    description: string;
    stock: number;
    deletedImageIds: string[];
    newThumbnail: string;
    newDetailImages: string[];
}

const putProduct = (productId: number) => async (productData: PutProductRequest) => {
    const response = await apiClient.put(`/api/v1/products/${productId}`, productData);
    return response.data;
};

export const usePutProduct = (productId: number) => {
    const queryClient = useQueryClient();

    return useMutation<null, Error, PutProductRequest>({
        mutationFn: putProduct(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products", productId],
            });
        },
        onError: () => {},
    });
};
