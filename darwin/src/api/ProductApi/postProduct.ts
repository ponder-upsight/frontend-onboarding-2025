import { ProductApi } from "@/utils/fetchData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PostProductRequest, PostProductResponse } from "./ProductApiTypes";

const postProduct = async (productData: PostProductRequest) => {
    const response = await ProductApi.postProduct(productData);
    return response.data;
};

export const usePostProduct = () => {
    const queryClient = useQueryClient();
    
    return useMutation<PostProductResponse, Error, PostProductRequest>({
        mutationFn: postProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
        onError: () => {},
    });
};
