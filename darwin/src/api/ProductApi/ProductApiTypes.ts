export interface Product {
    id: string;
    productName: string;
    thumbnailUrl: string;
    stock: number;
}

export interface ProductDetails {
    id: number;
    name: string;
    description: string;
    stock: number;
    createdAt: string;
    thumbnailUrl: string;
    detailFileUrls: string[];
}

export interface PostProductRequest {
    name: string;
    description: string;
    amount: number;
    thumbnail: string;
    detail: string[];
}


export interface PutProductRequest {
    name: string;
    description: string;
    stock: number;
    deletedImageIds: string[];
    newThumbnail: string;
    newDetailImages: string[];
}

export interface OrderProductRequest {
    quantity: number;
}
