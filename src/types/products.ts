export interface Product {
  id: string;
  name: string;
  description: string;
  stock: number;
  createdAt: string;
  thumbUrl: string; // 제품 목록에 표시될 대표 이미지
  imageUrls: string[]; // 제품 상세 페이지에 표시될 추가 이미지 배열
}

export type ProductDetailItem = {
  name: string;
  description: string;
  stock: number;
  thumbnailUrl: string;
  detailFileUrls: string[];
};

export type ProductListItem = {
  id: string;
  productName: string;
  thumbnailUrl: string;
  stock: number;
};
