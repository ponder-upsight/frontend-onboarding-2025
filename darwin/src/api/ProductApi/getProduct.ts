import { useQuery } from "@tanstack/react-query";

import apiClient from "@/api/apiClient";
import { ProductDetails } from "./ProductApiTypes";

const getProduct = async (productId: number) => {
    const response = await apiClient.get(`/api/v1/products/${productId}`);
    return response.data;
};

export const useGetProduct = (productId: number) => {
    return useQuery<ProductDetails>({
        queryKey: ["productId", productId],
        queryFn: () => {
            return getProduct(productId);
        },
        enabled: !!productId,
    });
};
