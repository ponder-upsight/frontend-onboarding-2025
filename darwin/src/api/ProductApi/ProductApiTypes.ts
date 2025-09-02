export interface Product {
    id: number;
    name: string;
    description: string;
    stock: number;
    createdAt: string;
    imageUrl: string;
    detailImageUrls: string[];
}

export interface PostProductRequest {
    name: string;
    description: string;
    stock: number;
    imageUrl: string;
    detailImageUrls: string[];
}

export interface PostProductResponse {
    id: number;
    name: string;
    description: string;
    stock: number;
    createdAt: string;
    imageUrl: string;
    detailImageUrls: string[];
}
