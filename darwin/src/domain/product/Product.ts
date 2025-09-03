export class Product {
  constructor(
    public id: string | null = null,
    public name: string,
    public stockQuantity: number,
    public thumbnailUrl: string,
  ) {}
}
