import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "../QueryKeys";
import { publicAxiosInstance } from "@/util/fetchUtil/axionsInstance";
import { useRouter } from "next/navigation";
import revaildateTags from "@/app/api/revalidate";

interface ProductCreateProps {
  name: string;
  description: string;
  amount: number;
  thumbnail: File; // string($binary)
  detail: File[]; // array of binary strings
}

const postCreateProduct = async (newProduct: ProductCreateProps) => {
  const formData = new FormData();
  formData.append("name", newProduct.name);
  formData.append("description", newProduct.description);
  formData.append("amount", newProduct.amount.toString());
  formData.append("thumbnail", newProduct.thumbnail);
  newProduct.detail.forEach((file) => {
    formData.append("detail", file);
  });

  const response = await publicAxiosInstance.post("/products", formData, {});

  return response.data;
};

export const usePostCreateProduct = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (newProduct: ProductCreateProps) =>
      postCreateProduct(newProduct),
    onSuccess: () => {
      // 상품 생성 성공 시, 상품 목록 캐시를 무효화하여 최신 데이터로 갱신
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCTS] });

      revaildateTags([QueryKeys.PRODUCTS]);

      router.push("/");
    },
  });
};

export default usePostCreateProduct;
