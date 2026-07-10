import Customer from './Customer.js';
import { ATransaction } from './ATransaction.js';
import { CustomerData, TransactionData } from '../types.js';

/**
 * Class representing a contribution
 *
 * @extends {ATransaction}
 *
 * @property {Customer} contributor - The contributor
 */
export default class Contribution extends ATransaction {
  public contributor?: Customer;

  constructor(data: Omit<TransactionData, 'customer'> & { contributor: CustomerData }) {
    super(data);

    if (data.contributor) {
      this.contributor = new Customer(data.contributor);
    }
  }
}
