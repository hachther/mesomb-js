import Customer from './Customer';
import { ATransaction } from './ATransaction';
import { CustomerData, TransactionData } from '../types';

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
