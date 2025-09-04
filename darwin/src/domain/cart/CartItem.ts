export class CartItem {
  constructor(
    public readonly productId: string,
    public quantity: number
  ) {}

  public isEqual(otherCartItem: CartItem): boolean {
    return this.productId === otherCartItem.productId;
  }

  public addQuantity(quantity: number) {
    this.quantity += quantity;
  }
}
