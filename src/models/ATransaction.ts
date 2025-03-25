import Location from './Location';
import { TransactionData } from '../types';

/**
 * Abstract class for transaction
 *
 * @abstract
 *
 * @property {string} pk - Primary key of the transaction
 * @property {string} status - Status of the transaction
 * @property {string} type - Type of the transaction
 * @property {number} amount - Amount of the transaction
 * @property {number} fees - Fees of the transaction
 * @property {string} bParty - B party of the transaction
 * @property {string} message - Message of the transaction
 * @property {string} service - Service of the transaction
 * @property {string} reference - Reference of the transaction
 * @property {Date} date - Date of the transaction
 * @property {string} country - Country of the transaction
 * @property {string} currency - Currency of the transaction
 * @property {string} finTrxId - Financial transaction ID of the transaction
 * @property {number} trxamount - Total transaction amount
 * @property {Location} location - Location of the transaction
 */
export abstract class ATransaction {
  private readonly data: Record<string, any>;

  public pk: string;
  public status: string;
  public type: string;
  public amount: number;
  public fees: number;
  // tslint:disable-next-line:variable-name
  public bParty: string;
  public message: string;
  public service: string;
  public reference?: string;
  public date: Date;
  public country: string;
  public currency: string;
  // tslint:disable-next-line:variable-name
  public finTrxId: string;
  public trxamount?: number;
  public location?: Location;

  constructor(data: Omit<TransactionData, 'customer'>) {
    this.data = data;

    this.pk = data.pk;
    this.status = data.status;
    this.type = data.type;
    this.amount = data.amount;
    this.fees = data.fees;
    this.bParty = data.b_party;
    this.message = data.message;
    this.service = data.service;
    this.reference = data.reference;
    this.date = new Date(data.ts);
    this.country = data.country;
    this.currency = data.currency;
    this.finTrxId = data.fin_trx_id;
    this.trxamount = data.trxamount;

    if (data.location) {
      this.location = new Location(data.location);
    }
  }

  /**
   * Check if transaction is success
   *
   * @return {boolean}
   */
  public isSuccess(): boolean {
    return this.status === 'SUCCESS';
  }

  /**
   * Check if transaction is pending
   *
   * @return {boolean}
   */
  public isPending(): boolean {
    return this.status === 'PENDING';
  }

  /**
   * Check if transaction is failed
   *
   * @return {boolean}
   */
  public isFailed(): boolean {
    return this.status === 'FAILED';
  }

  /**
   * @return {Record<string, any>} - data go from the server
   */
  public getData(): Record<string, any> {
    return this.data;
  }
}
