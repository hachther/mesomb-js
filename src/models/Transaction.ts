import {TransactionData} from "../types";
import Customer from "./Customer";
import Location from "./Location";
import Product from "./Product";

export default class Transaction {
  public pk: string;
  public success: string;
  public type: string;
  public amount: number;
  public fees: number;
  // tslint:disable-next-line:variable-name
  public b_party: string;
  public message: string;
  public service: string;
  public reference?: string;
  public ts: Date;
  public country: string;
  public currency: string;
  // tslint:disable-next-line:variable-name
  public fin_trx_id: string;
  public trxamount?: number;
  public location?: Location;
  public customer?: Customer;
  public products?: Product[];
  constructor(data: Record<string, any>) {
    this.pk = data.pk;
    this.success = data.success;
    this.type = data.type;
    this.amount = data.amount;
    this.fees = data.fees;
    this.b_party = data.b_party;
    this.message = data.message;
    this.service = data.service;
    this.reference = data.reference;
    this.ts = data.ts;
    this.country = data.country;
    this.currency = data.currency;
    this.fin_trx_id = data.fin_trx_id;
    this.trxamount = data.trxamount;
    if (data.location) {
      this.location = new Location(data.location);
    }
    if (data.customer) {
      this.customer = new Customer(data.customer);
    }
    this.products = data.products?.map((d: Record<string, any>) => new Product(d));
  }
}
