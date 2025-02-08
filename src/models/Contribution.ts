import {TransactionData} from "../types";
import Customer from "./Customer";
import Location from "./Location";
import Product from "./Product";

export default class Contribution {
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
  public contributor?: Customer;

  constructor(data: Record<string, any>) {
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

    if (data.contributor) {
      this.contributor = new Customer(data.contributor);
    }
  }

  public isSuccess(): boolean {
    return this.status === 'SUCCESS';
  }

  /**
   * @return: data from the server
   */
  public toJSON(): Record<string, any> {
    return this.data;
  }
}
