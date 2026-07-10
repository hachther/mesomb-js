import { Application, Transaction, TransactionResponse } from '../models/index.js';
import PaymentAppResponse from '../models/PaymentAppResponse.js';
import 'isomorphic-fetch';
import {
  AirtimePurchaseRequest,
  MoneyCollectRequest,
  MoneyDepositRequest,
  PaymentRefundRequest,
  YangoRefillRequest,
} from '../types.js';
import { AOperation } from './AOperation.js';
import RandomGenerator from '../util/RandomGenerator.js';

/**
 * Containing all operations provided by MeSomb Payment Service.
 *
 * [Check the documentation here](https://mesomb.hachther.com/en/api/schema/)
 */
export default class PaymentOperation extends AOperation {
  service = 'payment';

  public constructor({
    applicationKey,
    accessKey,
    secretKey,
    language = 'en',
    timeout,
  }: {
    applicationKey: string;
    accessKey: string;
    secretKey: string;
    language?: string;
    timeout?: number;
  }) {
    super({ target: applicationKey, accessKey, secretKey, language, timeout });
  }

  /**
   * Collect money a user account
   *
   * @param {MoneyCollectRequest} params - collection parameter
   * @param {number} params.amount - Amount of the transaction
   * @param {'MTN' | 'ORANGE' | 'AIRTEL'} params.service - Payment service
   * @param {string} params.payer - Account number to collect from
   * @param {string} [params.nonce] - Unique string on each request
   * @param {string | number } [params.trxID] - If you want to include your transaction ID in the request
   * @param {string} [params.country='CM'] - 2 letters country code of the service (configured during your service registration in MeSomb)
   * @param {string} [params.currency='XAF'] - Currency of your service depending on your country
   * @param {boolean} [params.fees=true] - True if you want to include the fees in the amount
   * @param {string} [params.mode='synchronous'] - Mode of the transaction (synchronous or asynchronous)
   * @param {boolean} [params.conversion=false] - True in case of foreign currently defined if you want to rely on MeSomb to convert the amount in the local currency
   * @param {LocationRequest} [params.location] - Location of the customer
   * @param {CustomerRequest} [params.customer] - Customer details
   * @param {ProductRequest[] | ProductRequest} [params.products] - List of products
   * @param {Record<string, any>} [params.extra] - Additional parameters
   *
   * @returns {Promise<TransactionResponse>} - The transaction response
   *
   * @return TransactionResponse
   */
  public async makeCollect({
    amount,
    service,
    payer,
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
      amount_currency: currency,
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

    return new TransactionResponse(
      await this.executeRequest('POST', endpoint, new Date(), nonce ?? RandomGenerator.nonce(), body, mode),
    );
  }

  /**
   * Collect money to a user account
   *
   * @param {MoneyDepositRequest} params - The deposit parameters
   * @param {number} params.amount - Amount of the transaction
   * @param {'MTN' | 'ORANGE' | 'AIRTEL'} params.service - Payment service
   * @param {string} params.receiver - Account number to depose in
   * @param {string} [params.nonce] - Unique string on each request
   * @param {string | number | null} [params.trxID] - If you want to include your transaction ID in the request
   * @param {string} [params.country='CM'] - 2 letters country code of the service (configured during your service registration in MeSomb)
   * @param {string} [params.currency='XAF'] - Currency of your service depending on your country
   * @param {boolean} [params.conversion=false] - True in case of foreign currently defined if you want to rely on MeSomb to convert the amount in the local currency
   * @param {LocationRequest} [params.location] - Location of the customer
   * @param {CustomerRequest} [params.customer] - Customer details
   * @param {ProductRequest[] | ProductRequest} [params.products] - List of products
   * @param {Record<string, any>} [params.extra] - Additional parameters
   * @returns {Promise<TransactionResponse>} - The transaction response
   */
  public async makeDeposit({
    amount,
    service,
    receiver,
    nonce,
    trxID,
    country = 'CM',
    currency = 'XAF',
    conversion = false,
    location,
    customer,
    products,
    extra,
  }: MoneyDepositRequest): Promise<TransactionResponse> {
    const endpoint = 'payment/deposit/';

    let body: Record<string, any> = { amount, receiver, service, country, currency, conversion, amount_currency: currency, };

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

    return new TransactionResponse(
      await this.executeRequest('POST', endpoint, new Date(), nonce ?? RandomGenerator.nonce(), body),
    );
  }


  /**
   * Collect money to a user account
   *
   * @param {MoneyDepositRequest} params - The deposit parameters
   * @param {number} params.amount - Amount of the transaction
   * @param {'MTN' | 'ORANGE' | 'AIRTEL'} params.service - Payment service
   * @param {string} params.receiver - Account number to depose in
   * @param {'MTN' | 'ORANGE' | 'CAMTEL' | 'NEXTTEL' | 'YOOMEE'} params.merchant - Unique string on each request
   * @param {string} [params.nonce] - Unique string on each request
   * @param {string | number | null} [params.trxID] - If you want to include your transaction ID in the request
   * @param {string} [params.country='CM'] - 2 letters country code of the service (configured during your service registration in MeSomb)
   * @param {string} [params.currency='XAF'] - Currency of your service depending on your country
   * @param {LocationRequest} [params.location] - Location of the customer
   * @param {CustomerRequest} [params.customer] - Customer details
   * @param {ProductRequest[] | ProductRequest} [params.products] - List of products
   * @param {Record<string, any>} [params.extra] - Additional parameters
   * @returns {Promise<TransactionResponse>} - The transaction response
   */
  public async purchaseAirtime({
    amount,
    service,
    receiver,
    merchant,
    nonce,
    trxID,
    country = 'CM',
    currency = 'XAF',
    location,
    customer,
    products,
    extra,
  }: AirtimePurchaseRequest): Promise<TransactionResponse> {
    const endpoint = 'payment/airtime/';

    let body: Record<string, any> = { amount, receiver, service, country, currency, merchant, amount_currency: currency, };

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

    return new TransactionResponse(
      await this.executeRequest('POST', endpoint, new Date(), nonce ?? RandomGenerator.nonce(), body),
    );
  }

  /**
   * Method to refund customer based on a transaction
   *
   * @param id of the transaction
   * @param params{PaymentRefundRequest} refund parameter
   *
   * @return TransactionResponse
   */
  public async refundTransaction(
    id: string,
    { amount, nonce, conversion = false, currency = 'XAF' }: PaymentRefundRequest,
  ): Promise<TransactionResponse> {
    const endpoint = 'payment/refund/';

    const body: Record<string, any> = { id, currency, conversion, amount_currency: currency };

    if (amount) {
      body.amount = amount;
    }

    return new TransactionResponse(
      await this.executeRequest('POST', endpoint, new Date(), nonce ?? RandomGenerator.nonce(), body),
    );
  }

  /**
   * Get the current status of your service on MeSomb
   */
  public async getStatus(): Promise<Application> {
    const endpoint = 'payment/status/';
    return new Application(await this.executeRequest('GET', endpoint, new Date(), ''));
  }

  /**
   * Retrieve the current payment pricing information for the application.
   */
  public async getPricing(): Promise<PaymentAppResponse> {
    const endpoint = 'payment/pricing/';
    return new PaymentAppResponse(await this.executeRequest('GET', endpoint, new Date(), ''));
  }

  /**
   * Refill a Yango driver account.
   */
  public async yangoRefill(params: YangoRefillRequest): Promise<TransactionResponse> {
    const { nonce, mode = 'synchronous', ...body } = params;
    const endpoint = 'payment/yango/refill/';

    return new TransactionResponse(
      await this.executeRequest('POST', endpoint, new Date(), nonce ?? RandomGenerator.nonce(), body, mode),
    );
  }

  /**
   * Fetch transactions base on MeSomb IDs or external IDs
   *
   *
   * @return Transaction[]
   * @param ids
   * @param source
   */
  public async getTransactions(
    ids: string[],
    source: 'MESOMB' | 'EXTERNAL' = 'MESOMB',
  ): Promise<Record<string, any>[]> {
    const endpoint = `payment/transactions/?ids=${ids.join(',')}&source=${source}`;
    return (await this.executeRequest('GET', endpoint, new Date(), '')).map((d: any) => new Transaction(d));
  }

  /**
   * Check transactions base on MeSomb IDs or external IDs
   *
   * @return Transaction[]
   * @param ids
   * @param source
   */
  public async checkTransactions(ids: string[], source = 'MESOMB'): Promise<Record<string, any>[]> {
    const endpoint = `payment/transactions/check/?ids=${ids.join(',')}&source=${source}`;
    return (await this.executeRequest('GET', endpoint, new Date(), '')).map((d: any) => new Transaction(d));
  }
}
