import Customer from './Customer';
import Product from './Product';
import { ATransaction } from './ATransaction';
import { TransactionData } from '../types';
/**
 * Transaction model
 *
 * @property {Customer} [customer] - Customer details
 * @property {Product[]} [products] - List of products
 *
 * @extends ATransaction
 */
export default class Transaction extends ATransaction {
    customer?: Customer;
    products?: Product[];
    constructor(data: TransactionData);
}
