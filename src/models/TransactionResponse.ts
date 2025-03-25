import Transaction from './Transaction';
import { TransactionData } from '../types';

/**
 * Represents the response of a transactional operation.
 *
 * @class TransactionResponse
 *
 * @property {boolean} success - Indicates if the operation was successful.
 * @property {string} message - Message associated with the transaction response.
 * @property {string} redirect - URL to redirect if needed.
 * @property {Transaction} transaction - The transaction details.
 * @property {string} reference - Reference ID of the transaction.
 * @property {'SUCCESS' | 'FAILED' | 'PENDING'} status - Status of the transaction.
 *
 * @see {@link Transaction}
 */
export default class TransactionResponse {
  /**
   * Indicates if the operation was successful.
   */
  public readonly success: boolean;

  /**
   * Message associated with the transaction response.
   */
  public message: string;

  /**
   * URL to redirect if needed.
   */
  public redirect: string;

  /**
   * The transaction details.
   */
  public transaction: Transaction;

  /**
   * Reference ID of the transaction.
   */
  public reference: string;

  /**
   * Status of the transaction.
   */
  public status: 'SUCCESS' | 'FAILED' | 'PENDING';

  /**
   * Creates an instance of TransactionResponse.
   * @param {Record<string, any>} data - The data to initialize the response.
   */
  constructor(data: {success: boolean; message: string; redirect: string; transaction: TransactionData; reference: string; status: 'SUCCESS' | 'FAILED' | 'PENDING'}) {
    this.success = data.success;
    this.message = data.message;
    this.redirect = data.redirect;
    this.transaction = new Transaction(data.transaction);
    this.reference = data.reference;
    this.status = data.status;
  }

  /**
   * Checks if the operation was successful.
   * @returns {boolean} True if the operation was successful, otherwise false.
   */
  public isOperationSuccess(): boolean {
    return this.success;
  }

  /**
   * Checks if the transaction was successful.
   * @returns {boolean} True if the transaction was successful, otherwise false.
   */
  public isTransactionSuccess(): boolean {
    return this.transaction?.isSuccess() === true;
  }
}
