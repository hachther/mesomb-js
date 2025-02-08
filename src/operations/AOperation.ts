import MeSomb from '../MeSomb';
import { Signature } from '../Signature';
import { InvalidClientRequestError, PermissionDeniedError, ServerError, ServiceNotFoundError } from '../exceptions';

export abstract class AOperation {
  /**
   * Your target service key (application, fund, provider) on MeSomb
   *
   * @private
   */
  protected readonly target: string;

  /**
   * Your access key provided by MeSomb
   *
   * @private
   */
  protected readonly accessKey: string;

  /**
   * Your secret key provided by MeSomb
   *
   * @private
   */
  protected readonly secretKey: string;

  protected service!: string;

  public constructor({
    target,
    accessKey,
    secretKey,
  }: {
    target: string;
    accessKey: string;
    secretKey: string;
  }) {
    this.target = target;
    this.accessKey = accessKey;
    this.secretKey = secretKey;
  }

  protected _buildUrl(endpoint: string): string {
    return `${MeSomb.HOST}/api/${MeSomb.APIVERSION}/${endpoint}`;
  }

  protected _getAuthorization(
    method: string,
    endpoint: string,
    date: Date,
    nonce: string,
    headers: Record<string, string> = {},
    body?: Record<string, any> | undefined,
  ): string {
    const url = this._buildUrl(endpoint);

    const credentials = { accessKey: this.accessKey, secretKey: this.secretKey };

    return Signature.signRequest(this.service, method, url, date, nonce, credentials, headers, body || {});
  }

  private async _processClientException(response: Response) {
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

  protected async executeRequest(method: string, endpoint: string, date: Date, nonce: string, body: Record<string, any> | null = null, mode: string = 'asynchronous') {
    const url = this._buildUrl(endpoint);
    const headers: Record<string, string> = {
      'x-mesomb-date': String(date.getTime()),
      'x-mesomb-nonce': nonce,
      'Content-Type': 'application/json',
      'X-MeSomb-OperationMode': mode,
      'Accept-Language': MeSomb.LANGUAGE,
    };
    if (this.service === 'payment') {
      headers['X-MeSomb-Application'] = this.target;
    }
    if (this.service === 'fundraising') {
      headers['X-MeSomb-Fund'] = this.target
    }
    if (this.service === 'wallet') {
      headers['X-MeSomb-Provider'] = this.target
    }
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
      await this._processClientException(response);
    }
    return await response.json()
  }
}
