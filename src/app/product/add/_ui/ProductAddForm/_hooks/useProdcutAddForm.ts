import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  productSchema,
  ProductFormValues,
} from "@/lib/react-hook-form/schema/productSchema";
import usePostCreateProduct from "@/api/products/client/usePostCreateProduct";

interface UseProductAddFormReturn {
  methods: ReturnType<typeof useForm<ProductFormValues>>;
  onSubmit: (data: ProductFormValues) => void;
}

const useProductAddForm = (): UseProductAddFormReturn => {
  const { mutate: postCreateProduct } = usePostCreateProduct();

  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      amount: 0,
      thumbnail: undefined,
      detail: undefined,
    },
  });

  const { setError, clearErrors } = methods;

  const onSubmit = (data: ProductFormValues) => {
    // 썸네일이 필수
    if (!data.thumbnail || data.thumbnail.length === 0) {
      setError("thumbnail", {
        type: "manual",
        message: "메인 이미지를 선택해주세요.",
      });
      return;
    }

    clearErrors("thumbnail");

    const addApiData = {
      name: data.name,
      description: data.description,
      amount: data.amount,
      thumbnail: data.thumbnail[0],
      detail: data.detail ? Array.from(data.detail) : [],
    };

    postCreateProduct(addApiData);
  };
  return {
    methods,
    onSubmit,
  };
};
export default useProductAddForm;
