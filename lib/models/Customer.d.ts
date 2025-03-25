import { CustomerData } from '../types';
/**
 * Customer model
 *
 * @property {string} [email] - The customer's email
 * @property {string} [phone] - The customer's phone number
 * @property {string} [town] - The customer's town
 * @property {string} [region] - The customer's region
 * @property {string} [country] - The customer's country
 * @property {string} [firstName] - The customer's first name
 * @property {string} lastName - The customer's last name
 * @property {string} [address] - The customer's address
 *
 */
export default class Customer {
    private readonly data;
    email: string;
    phone: string;
    town: string;
    region: string;
    country: string;
    firstName: string;
    lastName: string;
    address: string;
    constructor(data: CustomerData);
    /**
     * Get the data receive from the server
     *
     * @returns {Record<string, any>}
     */
    getData(): Record<string, any>;
}
