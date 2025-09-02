import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_DETAIL_IMAGES = 10;

export type ProductFormValues = z.infer<typeof productSchema>;

export const productSchema = z.object({
  name: z
    .string({ message: "상품명을 입력해주세요." })
    .min(1, "상품명은 필수입니다."),
  description: z
    .string({ message: "상품 설명을 입력해주세요." })
    .min(1, "상품 설명은 필수입니다."),
  amount: z
    .number({ message: "가격을 입력해주세요." })
    .min(0, "가격은 0 이상이어야 합니다."),
  stock: z
    .number({ message: "재고 수량을 입력해주세요." })
    .min(0, "재고는 0 이상이어야 합니다."),
  thumbnail: z
    .custom<FileList>((files) => files instanceof FileList, {
      message: "메인 이미지를 선택해주세요.",
    })
    .refine(
      (files) => files?.length === 1,
      "메인 이미지는 1개 등록해야 합니다."
    )
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `메인 이미지의 최대 파일 크기는 5MB입니다.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "지원되지 않는 파일 형식입니다. (jpeg, jpg, png, webp)"
    ),
  detail: z
    .custom<FileList>((files) => !files || files instanceof FileList, {
      message: "상세 이미지 파일을 확인해주세요.",
    })
    .refine(
      (files) => !files || files.length <= MAX_DETAIL_IMAGES,
      `상세 이미지는 최대 ${MAX_DETAIL_IMAGES}개까지 등록할 수 있습니다.`
    )
    .refine(
      (files) =>
        !files || Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
      `각 상세 이미지의 최대 파일 크기는 5MB입니다.`
    )
    .refine(
      (files) =>
        !files ||
        Array.from(files).every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type)
        ),
      "지원되지 않는 파일 형식입니다."
    )
    .optional(),
});
