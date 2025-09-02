import { ProductApi } from "@/utils/fetchData";
import { useQuery } from "@tanstack/react-query";

import { Product } from "./ProductApiTypes";

const getProducts = async () => {
    const response = await ProductApi.getProducts();
    return response.data;
};

export const useGetProducts = () => {
    return useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: () => {
            return getProducts();
        },
    });
};
