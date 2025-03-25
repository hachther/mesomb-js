import { ProductData } from '../types';

/**
 * Product model
 *
 * @property {string} id - The product's id
 * @property {string} [name] - The product's name
 * @property {string} [category] - The product's category
 * @property {number} quantity - The product's quantity
 * @property {number} amount - The product's amount
 */
export default class Product {
  private readonly data: Record<string, any>;

  public id: string;
  public name: string;
  public category?: string;
  public quantity: number;
  public amount: number;

  public constructor(data: ProductData) {
    this.data = data;

    this.id = data.id;
    this.name = data.name;
    this.category = data.category;
    this.quantity = data.quantity;
    this.amount = data.amount;
  }

  /**
   * Get the data receive from the server
   *
   * @returns {Record<string, any>}
   */
  public getData() {
    return this.data;
  }
}
