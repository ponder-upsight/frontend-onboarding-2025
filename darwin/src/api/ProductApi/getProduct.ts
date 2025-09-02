import { ProductApi } from "@/utils/fetchData";
import { useQuery } from "@tanstack/react-query";

import { Product } from "./ProductApiTypes";

const getProduct = async (productId: number) => {
    const response = await ProductApi.getProduct(productId);
    return response.data;
};

export const useGetProduct = (productId: number) => {
    return useQuery<Product>({
        queryKey: ["productId", productId],
        queryFn: () => {
            return getProduct(productId);
        },
        enabled: !!productId,
    });
};
