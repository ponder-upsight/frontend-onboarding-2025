import { ProductApi } from "@/utils/fetchData";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const deleteProduct = async (id: number) => {
    const response = await ProductApi.deleteProduct(id);
    return response.data;
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteProduct(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
    });
};
