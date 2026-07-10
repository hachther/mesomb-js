import Customer from './Customer.js';
import Product from './Product.js';
import { ATransaction } from './ATransaction.js';
import { ProductData, TransactionData } from '../types.js';

/**
 * Transaction model
 *
 * @property {Customer} [customer] - Customer details
 * @property {Product[]} [products] - List of products
 *
 * @extends ATransaction
 */
export default class Transaction extends ATransaction {
  public customer?: Customer;
  public products?: Product[];

  constructor(data: TransactionData) {
    super(data);

    if (data.customer) {
      this.customer = new Customer(data.customer);
    }

    this.products = data.products?.map((d: ProductData) => new Product(d));
  }
}
