import useGetProduct from "@/api/products/client/useGetProduct";
import usePutModifyProduct from "@/api/products/client/usePutModifyProduct";

import {
  ProductModifyFormValues,
  productModifySchema,
} from "@/lib/react-hook-form/schema/productModifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface UseProductModifyFormProps {
  productId: string;
}

interface UseProductModifyFormReturn {
  methods: ReturnType<typeof useForm<ProductModifyFormValues>>;
  onSubmit: (data: ProductModifyFormValues) => void;
  product: ReturnType<typeof useGetProduct>["data"];
}

const useProductModifyForm = ({
  productId,
}: UseProductModifyFormProps): UseProductModifyFormReturn => {
  const { mutate: putModifyProduct } = usePutModifyProduct();
  const { data: product } = useGetProduct(productId);

  // Optional chaining과 nullish coalescing을 사용한 안전한 구조분해할당
  const { name = "", description = "", stock = 0 } = product ?? {};

  const methods = useForm<ProductModifyFormValues>({
    resolver: zodResolver(productModifySchema),
    mode: "onChange",
    defaultValues: {
      name,
      description,
      amount: stock,
      deletedImageUrls: [],
      thumbnail: undefined,
      detail: undefined,
    },
  });

  const onSubmit = (data: ProductModifyFormValues) => {
    // 새 썸네일이 선택되었는지 확인
    const hasNewThumbnail = data.thumbnail && data.thumbnail.length > 0;

    // 삭제된 이미지 URL들을 ID로 변환

    // 수정 API 데이터 형식
    const modifyApiData = {
      productId,
      name: data.name,
      description: data.description,
      stock: data.amount,
      deletedImageIds: data.deletedImageUrls,
      ...(hasNewThumbnail &&
        data.thumbnail && { newThumbnail: data.thumbnail[0] }),
      newDetailImages: data.detail ? Array.from(data.detail) : [],
    };

    putModifyProduct(modifyApiData);
  };

  return {
    methods,
    onSubmit,
    product,
  };
};
export default useProductModifyForm;
