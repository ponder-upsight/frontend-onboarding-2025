import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import { publicAxiosInstance } from "@/util/fetchUtil/axionsInstance";
import { useRouter } from "next/navigation";

interface PutCreateProductProps {
  productId: string;
  name: string;
  description: string;
  stock: number;
  deletedImageIds: string[];
  newThumbnail?: File; // string($binary) - 선택사항
  newDetailImages: File[]; // array of binary strings
}

const putModifyProduct = async (newProduct: PutCreateProductProps) => {
  const {
    productId,
    name,
    description,
    stock,
    deletedImageIds,
    newThumbnail,
    newDetailImages,
  } = newProduct;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("stock", stock.toString());

  deletedImageIds.forEach((id) => {
    formData.append("deletedImageIds", id);
  });

  // newThumbnail이 있을 때만 추가
  if (newThumbnail) {
    formData.append("newThumbnail", newThumbnail);
  }

  newDetailImages.forEach((file) => {
    formData.append("newDetailImages", file);
  });

  const response = await publicAxiosInstance.put(
    `/products/${productId}`,
    formData,
    {}
  );
  return response.data;
};
export const usePutModifyProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (newProduct: PutCreateProductProps) =>
      putModifyProduct(newProduct),
    onSuccess: ({ productId }) => {
      // 상품 생성 성공 시, 상품 목록 캐시를 무효화하여 최신 데이터로 갱신
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCTS] });
      router.push(`/product/${productId}`);
    },
  });
};

export default usePutModifyProduct;
