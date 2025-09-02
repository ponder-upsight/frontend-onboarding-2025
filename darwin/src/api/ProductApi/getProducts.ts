import { useQuery } from "@tanstack/react-query";

import { Product } from "./ProductApiTypes";
import apiClient from "@/api/apiClient";

const getProducts = async () => {
    const response = await apiClient.get(`/api/v1/products`);
    return response.data.pageResult;
};

export const useGetProducts = () => {
    return useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: () => {
            return getProducts();
        },
    });
};
