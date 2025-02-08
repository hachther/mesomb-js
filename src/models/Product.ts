export default class Product {
  private data: Record<string, any>;

  public name: string;
  public category?: string;
  public quantity: number;
  public amount: number;

  public constructor(data: Record<string, any>) {
    this.data = data;

    this.name = data.name;
    this.category = data.category;
    this.quantity = data.quantity;
    this.amount = data.amount;
  }

  public toJSON() {
    return this.data;
  }
}
