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
    private readonly data;
    id: string;
    name: string;
    category?: string;
    quantity: number;
    amount: number;
    constructor(data: ProductData);
    /**
     * Get the data receive from the server
     *
     * @returns {Record<string, any>}
     */
    getData(): Record<string, any>;
}
