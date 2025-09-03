import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createProductApi} from "@/api/product/createProduct";
import {deleteProductApi} from "@/api/product/deleteProduct";
import {getProductsApi} from "@/api/product/getProducts";
import {getProductDetailsApi} from "@/api/product/getProductDetails";
import {orderProductApi} from "@/api/product/orderProduct";
import {updateProductApi} from "@/api/product/updateProduct";
import {Product} from "@/domain/product/Product";
import {ProductDetails} from "@/domain/product/ProductDetails";

export const useProduct = () => {
  const queryClient = useQueryClient()

  const useCreateProduct = () => {
    return useMutation<null, Error, {
      name: string;
      description: string;
      stockQuantity: number;
      thumbnailImage: File;
      detailImages: File[];
    }>({
      mutationFn: ({
        name,
        description,
        stockQuantity,
        thumbnailImage,
        detailImages,
      }) => createProductApi({
        name,
        description,
        amount: stockQuantity,
        thumbnail: thumbnailImage,
        detail: detailImages,
      }),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
      },
      onError: () => {},
    });
  };

  const useGetProducts = () => {
    return useQuery<Product[]>({
      queryKey: ["products"],
      queryFn: async () => {
        const data = await getProductsApi()
        return data.map((item) => new Product(
          item.id,
          item.productName,
          item.stock,
          item.thumbnailUrl,
        ));
      },
    });
  };

  const useGetProductDetails = (productId: string) => {
    return useQuery<ProductDetails>({
      queryKey: ["productId", productId],
      queryFn: async () => {
        const data = await getProductDetailsApi(productId);
        return new ProductDetails(
          productId,
          data.name,
          data.description,
          data.stock,
          data.thumbnailUrl,
          data.detailFileUrls,
          data.createdAt,
        )
      },
      enabled: !!productId,
    });
  };

  const useOrderProduct = (productId: string) => {
    return useMutation<null, Error, {
      stockQuantity: number
    }>({
      mutationFn: ({ stockQuantity }) => orderProductApi(
        productId,
        { quantity: stockQuantity },
      ),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["products", productId],
        });
      },
      onError: () => {},
    });
  };

  const useUpdateProduct = (productId: string) => {
    return useMutation<null, Error, {
      name: string;
      description: string;
      stockQuantity: number,
      deletedImageIds: string[],
      newThumbnailImage: File | null,
      newDetailImages: File[],
    }>({
      mutationFn: ({
        name,
        description,
        stockQuantity,
        deletedImageIds,
        newThumbnailImage,
        newDetailImages,
      }) => updateProductApi(productId, {
        name,
        description,
        stock: stockQuantity,
        deletedImageIds,
        newThumbnail: newThumbnailImage,
        newDetailImages: newDetailImages,
      }),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["products", productId],
        });
      },
      onError: () => {},
    });
  };

  const useDeleteProduct = () => {
    return useMutation({
      mutationFn: (id: string) => deleteProductApi(id),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
    });
  };

  return {
    useCreateProduct,
    useGetProducts,
    useGetProductDetails,
    useOrderProduct,
    useUpdateProduct,
    useDeleteProduct,
  }
}
