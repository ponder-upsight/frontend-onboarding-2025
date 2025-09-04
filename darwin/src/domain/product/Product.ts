export class Product {
  constructor(
    public readonly id: string | null = null,
    public readonly name: string,
    public readonly stockQuantity: number,
    public readonly thumbnailUrl: string
  ) {}
}
