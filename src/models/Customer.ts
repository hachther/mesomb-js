import { CustomerData } from '../types';
import Address from './Address';

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
  private readonly data: Record<string, any>;

  public email: string;
  public phone: string;
  public town: string;
  public region: string;
  public country: string;
  public firstName: string;
  public lastName: string;
  public address?: Address;

  public constructor(data: CustomerData) {
    this.data = data;

    this.email = data.email;
    this.phone = data.phone;
    this.town = data.town;
    this.region = data.region;
    this.country = data.country;
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.address = !!data.address ? new Address(data.address) : undefined;
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
