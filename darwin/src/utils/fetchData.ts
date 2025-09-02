import axiosInstance from "../api/axiosInstance";

export const ProductApi = {
    getProducts: () => {
        return axiosInstance.get(`/product`);
    },
    getProduct: (id: number) => {
        return axiosInstance.get(`/product/${id}`);
    },
    postProduct: (productData: any) => {
        return axiosInstance.post(`/product`, productData);
    },
    deleteProduct: (id: number) => {
        return axiosInstance.delete(`/product/${id}`);
    },
}
