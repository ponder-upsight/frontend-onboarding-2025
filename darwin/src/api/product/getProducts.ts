import { useQuery } from "@tanstack/react-query";

import apiClient from "@/api/apiClient";

export interface Product {
    id: string;
    productName: string;
    thumbnailUrl: string;
    stock: number;
}

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
