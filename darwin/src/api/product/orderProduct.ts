import { useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient from "@/api/apiClient";

export interface OrderProductRequest {
    quantity: number;
}

const orderProduct = (productId: string) => async (orderData: OrderProductRequest) => {
    const response = await apiClient.post(`/api/v1/products/${productId}`, orderData);
    return response.data;
};

export const useOrderProduct = (productId: string) => {
    const queryClient = useQueryClient();

    return useMutation<null, Error, OrderProductRequest>({
        mutationFn: orderProduct(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products", productId],
            });
        },
        onError: () => {},
    });
};
