import Settings from '../Settings';
import { Signature } from '../Signature';
import { InvalidClientRequestError, PermissionDeniedError, ServerError, ServiceNotFoundError } from '../exceptions';
import { Application, TransactionResponse } from '../models';
import "isomorphic-fetch";

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
    return `${Settings.HOST}/en/api/${Settings.APIVERSION}/${endpoint}`;
  }

  private _getAuthorization(
    method: string,
    endpoint: string,
    date: Date,
    nonce: string,
    headers: Record<string, string> = {},
    body: Record<string, any> | undefined = undefined,
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

  /**
   * Collect money a user account
   * [Check the documentation here](https://mesomb.hachther.com/en/api/schema/)
   *
   * @param amount amount to collect
   * @param service MTN, ORANGE, AIRTEL
   * @param payer account number to collect from
   * @param date date of the request
   * @param nonce unique string on each request
   * @param trxID ID of the transaction in your system
   * @param country country CM, NE
   * @param currency code of the currency of the amount
   * @param feesIncluded if your want MeSomb to include and compute fees in the amount to collect
   * @param mode
   * @param conversion In case of foreign currently defined if you want to rely on MeSomb to convert the amount in the local currency
   * @param location object containing the location of the customer check the documentation
   * @param customer object containing information of the customer check the documentation
   * @param product object containing information of the product check the documentation
   * @param extra Extra parameter to send in the body check the API documentation
   *
   * @return TransactionResponse
   */
  public async makeCollect(
    amount: number,
    service: string,
    payer: string,
    date: Date,
    nonce: string,
    trxID: string | number | null,
    country: string = 'CM',
    currency: string = 'XAF',
    feesIncluded: boolean = true,
    mode: 'synchronous' | 'asynchronous' = 'synchronous',
    conversion: boolean = false,
    location: Record<string, any> | undefined = undefined,
    customer: Record<string, any> | undefined = undefined,
    product: Record<string, any> | undefined = undefined,
    extra: Record<string, any> | undefined = undefined,
  ): Promise<TransactionResponse> {
    const endpoint = 'payment/collect/';
    const url = this._buildUrl(endpoint);

    let body: Record<string, any> = {
      amount,
      service,
      payer,
      country,
      currency,
      fees: feesIncluded,
      conversion,
    };
    if (location) {
      body.location = location;
    }
    if (customer) {
      body.customer = customer;
    }
    if (product) {
      body.product = product;
    }
    if (extra) {
      body = Object.assign(body, extra);
    }

    const authorization = this._getAuthorization(
      'POST',
      endpoint,
      date,
      nonce,
      { 'content-type': 'application/json' },
      body,
    );

    const headers: Record<string, string> = {
      'x-mesomb-date': String(date.getTime()),
      'x-mesomb-nonce': nonce,
      Authorization: authorization,
      'Content-Type': 'application/json',
      'X-MeSomb-Application': this.applicationKey,
      'X-MeSomb-OperationMode': mode,
    };
    if (trxID) {
      headers['X-MeSomb-TrxID'] = String(trxID);
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    });
    if (response.status >= 400) {
      await this.processClientException(response);
    }

    return new TransactionResponse(await response.json());
  }

  /**
   * Method to make deposit in a receiver mobile account.
   * [Check the documentation here](https://mesomb.hachther.com/en/api/schema/)
   *
   * @param amount the amount of the transaction
   * @param service service code (MTN, ORANGE, AIRTEL, ...)
   * @param receiver receiver account (in the local phone number)
   * @param date date of the request
   * @param nonce Unique key generated for each transaction
   * @param trxID ID of the transaction in your system
   * @param country country code 'CM' by default
   * @param currency currency of the transaction (XAF, XOF, ...) XAF by default
   * @param extra Extra parameters to send in the body check the API documentation
   *
   * @return TransactionResponse
   */
  public async makeDeposit(
    amount: number,
    service: string,
    receiver: string,
    date: Date,
    nonce: string,
    trxID: string | number | null,
    country: string = 'CM',
    currency: string = 'XAF',
    extra: Record<string, any> | undefined = undefined,
  ): Promise<TransactionResponse> {
    const endpoint = 'payment/deposit/';
    const url = this._buildUrl(endpoint);

    let body: Record<string, any> = { amount, receiver, service, country, currency };
    if (extra) {
      body = Object.assign(body, extra);
    }

    const authorization = this._getAuthorization(
      'POST',
      endpoint,
      date,
      nonce,
      { 'content-type': 'application/json' },
      body,
    );

    const headers: Record<string, string> = {
      'x-mesomb-date': String(date.getTime()),
      'x-mesomb-nonce': nonce,
      Authorization: authorization,
      'Content-Type': 'application/json',
      'X-MeSomb-Application': this.applicationKey,
    }
    if (trxID) {
      headers['X-MeSomb-TrxID'] = String(trxID);
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    });
    if (response.status >= 400) {
      await this.processClientException(response);
    }

    return new TransactionResponse(await response.json());
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
    date: Date | undefined = undefined,
  ): Promise<Application> {
    const endpoint = 'payment/security/';
    const url = this._buildUrl(endpoint);

    if (!date) {
      date = new Date();
    }

    const body: Record<string, any> = { field, action };

    if (action !== 'UNSET') {
      body.value = value;
    }

    const authorization = this._getAuthorization(
      'POST',
      endpoint,
      date,
      '',
      { 'content-type': 'application/json' },
      body,
    );

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'x-mesomb-date': String(date.getTime()),
        'x-mesomb-nonce': '',
        Authorization: authorization,
        'Content-Type': 'application/json',
        'X-MeSomb-Application': this.applicationKey,
      },
    });
    if (response.status >= 400) {
      await this.processClientException(response);
    }

    return new Application(await response.json());
  }

  /**
   * Get the current status of your service on MeSomb
   *
   * @param date date of the request
   */
  public async getStatus(date: Date | undefined = undefined): Promise<Application> {
    const endpoint = 'payment/status/';

    if (!date) {
      date = new Date();
    }

    const authorization = this._getAuthorization('GET', endpoint, date, '');

    const response = await fetch(this._buildUrl(endpoint), {
      method: 'GET',
      headers: {
        'x-mesomb-date': String(date.getTime()),
        'x-mesomb-nonce': '',
        Authorization: authorization,
        'X-MeSomb-Application': this.applicationKey,
      },
    });
    if (response.status >= 400) {
      await this.processClientException(response);
    }

    return new Application(await response.json());
  }

  public async getTransactions(ids: string[], date: Date | undefined = undefined): Promise<Array<Record<string, any>>> {
    const endpoint = `payment/transactions/?ids=${ids.join(',')}`;

    if (!date) {
      date = new Date();
    }

    const authorization = this._getAuthorization('GET', endpoint, date, '');

    const response = await fetch(this._buildUrl(endpoint), {
      method: 'GET',
      headers: {
        'x-mesomb-date': String(date.getTime()),
        'x-mesomb-nonce': '',
        Authorization: authorization,
        'X-MeSomb-Application': this.applicationKey,
      },
    });
    if (response.status >= 400) {
      await this.processClientException(response);
    }

    return await response.json();
  }
}
