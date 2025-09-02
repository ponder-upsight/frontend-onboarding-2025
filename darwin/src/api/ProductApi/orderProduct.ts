import { useMutation, useQueryClient } from "@tanstack/react-query";

import { OrderProductRequest } from "./ProductApiTypes";
import apiClient from "@/api/apiClient";

const orderProduct = (id: number) => async (orderData: OrderProductRequest) => {
    const response = await apiClient.post(`/api/v1/products/${id}`, orderData);
    return response.data;
};

export const useOrderProduct = (productId: number) => {
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
