import MeSomb from '../MeSomb';
import { Signature } from '../Signature';
import {ServiceNotFoundError, ServerError, PermissionDeniedError, InvalidClientRequestError} from '../exceptions';
import {Application, Transaction, TransactionResponse} from '../models';
import "isomorphic-fetch";
import {MoneyCollectRequest, MoneyDepositRequest} from "../types";

/**
 * Containing all operations provided by MeSomb Payment Service.
 *
 * [Check the documentation here](https://mesomb.hachther.com/en/api/schema/)
 */
export class PaymentOperation {
  /**
   * Your service application key on MeSomb
   *
   * @private
   */
  private readonly applicationKey: string;

  /**
   * Your access key provided by MeSomb
   *
   * @private
   */
  private readonly accessKey: string;

  /**
   * Your secret key provided by MeSomb
   *
   * @private
   */
  private readonly secretKey: string;

  public constructor({
    applicationKey,
    accessKey,
    secretKey,
  }: {
    applicationKey: string;
    accessKey: string;
    secretKey: string;
  }) {
    this.applicationKey = applicationKey;
    this.accessKey = accessKey;
    this.secretKey = secretKey;
  }

  private _buildUrl(endpoint: string): string {
    return `${MeSomb.HOST}/${MeSomb.LANGUAGE}/api/${MeSomb.APIVERSION}/${endpoint}`;
  }

  private _getAuthorization(
    method: string,
    endpoint: string,
    date: Date,
    nonce: string,
    headers: Record<string, string> = {},
    body?: Record<string, any> | undefined,
  ): string {
    const url = this._buildUrl(endpoint);

    const credentials = { accessKey: this.accessKey, secretKey: this.secretKey };

    return Signature.signRequest('payment', method, url, date, nonce, credentials, headers, body || {});
  }

  private async processClientException(response: Response) {
    let message: string = await response.text();
    let code: string | undefined;
    if (message.startsWith('{')) {
      const data = JSON.parse(message);
      message = data.detail;
      code = data.code;
    }
    switch (response.status) {
      case 404:
        throw new ServiceNotFoundError(message);
      case 403:
      case 401:
        throw new PermissionDeniedError(message);
      case 400:
        throw new InvalidClientRequestError(message, code);
      default:
        throw new ServerError(message, code);
    }
  }

  private async _executeRequest(method: string, endpoint: string, date: Date, nonce: string, body: Record<string, any> | null = null, mode: string = 'asynchronous') {
    const url = this._buildUrl(endpoint);
    const headers: Record<string, string> = {
      'x-mesomb-date': String(date.getTime()),
      'x-mesomb-nonce': nonce,
      'Content-Type': 'application/json',
      'X-MeSomb-Application': this.applicationKey,
      'X-MeSomb-OperationMode': mode,
    };
    if (body?.trxID) {
      headers['X-MeSomb-TrxID'] = String(body.trxID);
      delete body.trxID;
    }
    if (body) {
      body.source = `MeSombJS/v${MeSomb.VERSION}`;
    }

    let authorization: string;
    if (method === 'POST' && body) {
      authorization = this._getAuthorization(
        method,
        endpoint,
        date,
        nonce,
        { 'content-type': 'application/json' },
        body,
      );
    } else {
      authorization = this._getAuthorization(
        method,
        endpoint,
        date,
        nonce,
      );
    }
    headers.Authorization = authorization;

    const response = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers,
    });
    if (response.status >= 400) {
      await this.processClientException(response);
    }
    return await response.json()
  }

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

    return new TransactionResponse(await this._executeRequest('POST', endpoint, date, nonce, body, mode));
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

    return new TransactionResponse(await this._executeRequest('POST', endpoint, date, nonce, body));
  }

  /**
   * Update security parameters of your service on MeSomb
   *
   * @param field which security field you want to update (check API documentation)
   * @param action SET or UNSET
   * @param value value of the field
   * @param date date of the request
   *
   * @return Application
   */
  public async updateSecurity(
    field: string,
    action: 'SET' | 'UNSET',
    value: any = null,
    date?: Date,
  ): Promise<Application> {
    const endpoint = 'payment/security/';

    if (!date) {
      date = new Date();
    }

    const body: Record<string, any> = { field, action };

    if (action !== 'UNSET') {
      body.value = value;
    }

    return new Application(await this._executeRequest('POST', endpoint, date, '', body));
  }

  /**
   * Get the current status of your service on MeSomb
   *
   * @param date date of the request
   */
  public async getStatus(date: Date = new Date()): Promise<Application> {
    const endpoint = 'payment/status/';
    return new Application(await this._executeRequest('GET', endpoint, date, ''));
  }

  public async getTransactions(ids: string[], source = 'MESOMB'): Promise<Record<string, any>[]> {
    const endpoint = `payment/transactions/?ids=${ids.join(',')}&source=${source}`;
    return (await this._executeRequest('GET', endpoint, new Date(), '')).map((d: any) => new Transaction(d));
  }

  public async checkTransactions(ids: string[], source = 'MESOMB'): Promise<Record<string, any>[]> {
    const endpoint = `payment/transactions/check/?ids=${ids.join(',')}&source=${source}`;
    return (await this._executeRequest('GET', endpoint, new Date(), '')).map((d: any) => new Transaction(d));
  }
}
