import { z } from "zod";
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_DETAIL_IMAGES,
  MAX_FILE_SIZE,
} from "./constant";

export type ProductModifyFormValues = z.infer<typeof productModifySchema>;

// 수정 모드용 schema (썸네일이 선택사항)
export const productModifySchema = z.object({
  name: z
    .string({ message: "상품명을 입력해주세요." })
    .min(1, "상품명은 필수입니다."),
  description: z
    .string({ message: "상품 설명을 입력해주세요." })
    .min(1, "상품 설명은 필수입니다."),
  amount: z
    .number({ message: "재고수량을 입력해주세요." })
    .min(0, "재고는 0 이상이어야 합니다."),
  deletedImageUrls: z.array(z.string()),

  thumbnail: z
    .custom<FileList>((files) => !files || files instanceof FileList, {
      message: "메인 이미지 파일을 확인해주세요.",
    })
    .refine(
      (files) => !files || files.length === 1,
      "메인 이미지는 1개만 선택할 수 있습니다."
    )
    .refine(
      (files) => !files || files[0]?.size <= MAX_FILE_SIZE,
      `메인 이미지의 최대 파일 크기는 5MB입니다.`
    )
    .refine(
      (files) => !files || ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      "지원되지 않는 파일 형식입니다. " + ACCEPTED_IMAGE_TYPES.join(",")
    )
    .optional(),
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

export const productModifySchemaKey = {
  name: "name",
  description: "description",
  amount: "amount",
  deletedImageUrls: "deletedImageUrls",
  thumbnail: "thumbnail",
  detail: "detail",
};
