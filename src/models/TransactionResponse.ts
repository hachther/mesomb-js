import {TransactionData} from "../types";
import Transaction from "./Transaction";

export default class TransactionResponse {
  public readonly success: boolean;
  public message: string;
  public redirect: string;
  public transaction: Transaction;
  public reference: string;
  public status: 'SUCCESS' | 'FAILED' | 'PENDING';

  constructor(data: Record<string, any>) {
    this.success = data.success;
    this.message = data.message;
    this.redirect = data.redirect;
    this.transaction = new Transaction(data.transaction);
    this.reference = data.reference;
    this.status = data.status;
  }

  public isOperationSuccess(): boolean {
    return this.success;
  }

  public isTransactionSuccess(): boolean {
    return this.success && this.status === 'SUCCESS';
  }
}
