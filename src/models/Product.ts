export default class Product {
  public name: string;
  public category?: string;
  public quantity: number;
  public amount: number;

  public constructor(data: Record<string, any>) {
    this.name = data.name;
    this.category = data.category;
    this.quantity = data.quantity;
    this.amount = data.amount;
  }
}
