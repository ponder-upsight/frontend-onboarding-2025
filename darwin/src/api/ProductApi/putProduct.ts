import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PutProductRequest } from "./ProductApiTypes";
import apiClient from "@/api/apiClient";

const putProduct = async (productData: PutProductRequest) => {
    const response = await apiClient.put(`/api/v1/products`, productData);
    return response.data;
};

export const usePutProduct = () => {
    const queryClient = useQueryClient();

    return useMutation<null, Error, PutProductRequest>({
        mutationFn: putProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
        onError: () => {},
    });
};
