import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient from "@/api/apiClient";

export interface PutProductRequest {
    name: string;
    description: string;
    stock: number;
    deletedImageIds: string[];
    newThumbnail: File | null;
    newDetailImages: File[];
}

const putProduct = (productId: number) => async (productData: PutProductRequest) => {
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('stock', productData.stock.toString());
    
    productData.deletedImageIds.forEach((id) => {
        formData.append('deletedImageIds', id);
    });
    
    if (productData.newThumbnail) {
        formData.append('newThumbnail', productData.newThumbnail);
    }
    
    productData.newDetailImages.forEach((file) => {
        formData.append('newDetailImages', file);
    });

    const response = await apiClient.put(`/api/v1/products/${productId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
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
