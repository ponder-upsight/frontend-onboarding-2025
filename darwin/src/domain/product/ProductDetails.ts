export class ProductDetails {
  constructor(
    public readonly id: string | null = null,
    public readonly name: string,
    public readonly description: string,
    public readonly stockQuantity: number,
    public readonly thumbnailUrl: string,
    public readonly detailImagesUrl: string[],
    public readonly createdAt: string
  ) {}
}
