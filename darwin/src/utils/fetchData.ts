import axiosInstance from "../api/axiosInstance";

export const ProductApi = {
    getProducts: () => {
        return axiosInstance.get(`/product`);
    },
    getProduct: (id: number) => {
        return axiosInstance.get(`/product/${id}`);
    },
    deleteProduct: (id: number) => {
        return axiosInstance.delete(`/product/${id}`);
    },
}
