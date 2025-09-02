import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient from "@/api/apiClient";

export interface PostProductRequest {
    name: string;
    description: string;
    amount: number;
    thumbnail: string;
    detail: string[];
}

const postProduct = async (productData: PostProductRequest) => {
    const response = await apiClient.post(`/api/v1/products`, productData);
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
