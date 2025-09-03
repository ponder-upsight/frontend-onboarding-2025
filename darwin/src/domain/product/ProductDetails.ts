export class ProductDetails {
  constructor(
    public id: string | null = null,
    public name: string,
    public description: string,
    public stockQuantity: number,
    public thumbnailUrl: string,
    public detailImagesUrl: string[],
    public createdAt: string,
  ) {}
}
