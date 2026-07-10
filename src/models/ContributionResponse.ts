import Contribution from './Contribution.js';
import { CustomerData, LocationData, TransactionData } from '../types.js';

/**
 * Class representing a transaction response
 *
 * @property {boolean} success - Indicates if the operation was successful
 * @property {string} message - The message of the response
 * @property {Contribution} contribution - The contribution
 * @property {'SUCCESS' | 'FAILED' | 'PENDING'} status - The status of the transaction
 */
export default class TransactionResponse {
  public readonly success: boolean;
  public message: string;
  public contribution: Contribution;
  public status: 'SUCCESS' | 'FAILED' | 'PENDING';

  constructor(data: {
    success: boolean;
    message: string;
    contribution: Omit<TransactionData, 'customer'> & { contributor: CustomerData };
    status: 'SUCCESS' | 'FAILED' | 'PENDING';
  }) {
    this.success = data.success;
    this.message = data.message;
    this.contribution = new Contribution(data.contribution);
    this.status = data.status;
  }

  /**
   * Check if the operation is successful
   *
   * @returns {boolean}
   */
  public isOperationSuccess(): boolean {
    return this.success;
  }

  /**
   * Check if the contribution is successful
   *
   * @returns {boolean}
   */
  public isContributionSuccess(): boolean {
    return this.contribution?.isSuccess() === true;
  }
}
