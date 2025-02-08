import MeSomb from '../MeSomb';
import { Signature } from '../Signature';
import {ServiceNotFoundError, ServerError, PermissionDeniedError, InvalidClientRequestError} from '../exceptions';
import {Application, Transaction, TransactionResponse} from '../models';
import "isomorphic-fetch";
import { MoneyCollectRequest, MoneyDepositRequest, PaymentRefundRequest } from '../types';
import { AOperation } from './AOperation';

/**
 * Containing all operations provided by MeSomb Payment Service.
 *
 * [Check the documentation here](https://mesomb.hachther.com/en/api/schema/)
 */
export class PaymentOperation extends AOperation {
  service = 'payment';

  /**
   * Collect money a user account
   * [Check the documentation here](https://mesomb.hachther.com/en/api/schema/)
   *
   * @param amount: amount to collect
   * @param service: payment service with the possible values MTN, ORANGE, AIRTEL
   * @param payer: account number to collect from
   * @param date: date of the request
   * @param nonce: unique string on each request
   * @param country: 2 letters country code of the service (configured during your service registration in MeSomb)
   * @param currency: currency of your service depending on your country
   * @param fees: false if your want MeSomb fees to be computed and included in the amount to collect
   * @param mode: asynchronous or synchronous
   * @param conversion: true in case of foreign currently defined if you want to rely on MeSomb to convert the amount in the local currency
   * @param location: Map containing the location of the customer with the following attributes: town, region and location all string.
   * @param products: It is ArrayList of products. Each product are Map with the following attributes: name string, category string, quantity int and amount float
   * @param customer: a Map containing information about the customer: phone string, email: string, first_name string, last_name string, address string, town string, region string and country string
   * @param trxID: if you want to include your transaction ID in the request
   * @param extra: Map to add some extra attribute depending on the API documentation
   *
   * @return TransactionResponse
   */
  public async makeCollect({
    amount,
    service,
    payer,
    date = new Date(),
    nonce,
    trxID,
    country = 'CM',
    currency = 'XAF',
    fees = true,
    mode = 'synchronous',
    conversion = false,
    location,
    customer,
    products,
    extra,
  }: MoneyCollectRequest): Promise<TransactionResponse> {
    const endpoint = 'payment/collect/';

    let body: Record<string, any> = {
      amount,
      service,
      payer,
      country,
      currency,
      fees,
      conversion,
    };
    if (trxID) {
      body.trxID = trxID;
    }
    if (location) {
      body.location = location;
    }
    if (customer) {
      body.customer = customer;
    }
    if (products) {
      body.products = Array.isArray(products) ? products : [products];
    }
    if (extra) {
      body = Object.assign(body, extra);
    }

    return new TransactionResponse(await this.executeRequest('POST', endpoint, date, nonce, body, mode));
  }

  /**
   * Method to make deposit in a receiver mobile account.
   * [Check the documentation here](https://mesomb.hachther.com/en/api/schema/)
   *
   * @param amount: amount to collect
   * @param service: payment service with the possible values MTN, ORANGE, AIRTEL
   * @param receiver: account number to collect from
   * @param date: date of the request
   * @param nonce: unique string on each request
   * @param country: 2 letters country code of the service (configured during your service registration in MeSomb)
   * @param currency: currency of your service depending on your country
   * @param fees: false if your want MeSomb fees to be computed and included in the amount to collect
   * @param conversion: true in case of foreign currently defined if you want to rely on MeSomb to convert the amount in the local currency
   * @param location: Map containing the location of the customer with the following attributes: town, region and location all string.
   * @param products: It is ArrayList of products. Each product are Map with the following attributes: name string, category string, quantity int and amount float
   * @param customer: a Map containing information about the customer: phone string, email: string, first_name string, last_name string, address string, town string, region string and country string
   * @param trxID: if you want to include your transaction ID in the request
   * @param extra: Map to add some extra attribute depending on the API documentation
   *
   * @return TransactionResponse
   */
  public async makeDeposit({
    amount,
    service,
    receiver,
    date = new Date(),
    nonce,
    trxID,
    country = 'CM',
    currency = 'XAF',
    conversion = false,
    location,
    customer,
    products,
    extra
  }: MoneyDepositRequest): Promise<TransactionResponse> {
    const endpoint = 'payment/deposit/';

    let body: Record<string, any> = { amount, receiver, service, country, currency, conversion };

    if (trxID) {
      body.trxID = trxID;
    }
    if (location) {
      body.location = location;
    }
    if (customer) {
      body.customer = customer;
    }
    if (products) {
      body.products = Array.isArray(products) ? products : [products];
    }
    if (extra) {
      body = Object.assign(body, extra);
    }

    return new TransactionResponse(await this.executeRequest('POST', endpoint, date, nonce, body));
  }

  /**
   * Method to refund customer based on a transaction
   *
   * @param id: id to transaction to refund
   * @param amount: amount to refund
   * @param nonce: unique string on each request
   * @param conversion: true in case of foreign currently defined if you want to rely on MeSomb to convert the amount in the local currency
   * @param currency: currency of your service depending on your country
   *
   * @return TransactionResponse
   */
  public async refundTransaction({
    id,
    amount,
    nonce,
    conversion = false,
    currency = 'XAF',
  }: PaymentRefundRequest): Promise<TransactionResponse> {
    const endpoint = 'payment/refund/';

    const body: Record<string, any> = { id, currency, conversion };

    if (amount) {
      body.amount = amount;
    }

    return new TransactionResponse(await this.executeRequest('POST', endpoint, new Date(), nonce, body));
  }

  /**
   * Get the current status of your service on MeSomb
   *
   * @param date date of the request
   */
  public async getStatus(date: Date = new Date()): Promise<Application> {
    const endpoint = 'payment/status/';
    return new Application(await this.executeRequest('GET', endpoint, date, ''));
  }

  /**
   * Fetch transactions base on MeSomb IDs or external IDs
   *
   * @param ids: ids of the transactions
   * @param source: origin of the ID of the transactions (MESOMB for MeSomb and EXTERNAL for your system)
   *
   * @return Transaction[]
   */
  public async getTransactions(ids: string[], source: 'MESOMB' | 'EXTERNAL' = 'MESOMB'): Promise<Record<string, any>[]> {
    const endpoint = `payment/transactions/?ids=${ids.join(',')}&source=${source}`;
    return (await this.executeRequest('GET', endpoint, new Date(), '')).map((d: any) => new Transaction(d));
  }

  /**
   * Check transactions base on MeSomb IDs or external IDs
   *
   * @param ids: ids of the transactions
   * @param source: origin of the ID of the transactions (MESOMB for MeSomb and EXTERNAL for your system)
   *
   * @return Transaction[]
   */
  public async checkTransactions(ids: string[], source = 'MESOMB'): Promise<Record<string, any>[]> {
    const endpoint = `payment/transactions/check/?ids=${ids.join(',')}&source=${source}`;
    return (await this.executeRequest('GET', endpoint, new Date(), '')).map((d: any) => new Transaction(d));
  }
}
