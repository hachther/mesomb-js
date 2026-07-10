import MeSomb from '../MeSomb.js';
import Signature from '../Signature.js';
import { InvalidClientRequestError, PermissionDeniedError, ServerError, ServiceNotFoundError } from '../exceptions/index.js';
import Settings from '../MeSomb.js';

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

  protected readonly language: string;

  protected readonly timeout: number;

  protected service!: string;

  public constructor({
    target,
    accessKey,
    secretKey,
    language = 'en',
    timeout = Settings.TIMEOUT,
  }: {
    target: string;
    accessKey: string;
    secretKey: string;
    language?: string;
    timeout?: number;
  }) {
    this.target = target;
    this.accessKey = accessKey;
    this.secretKey = secretKey;
    this.language = language;
    this.timeout = timeout;
  }

  protected _buildUrl(endpoint: string): string {
    return `${MeSomb.HOST}/api/${MeSomb.APIVERSION}/${endpoint}`;
  }

  protected async _getAuthorization(
    method: string,
    endpoint: string,
    date: Date,
    nonce: string,
    headers: Record<string, string> = {},
    body?: Record<string, any> | undefined,
  ): Promise<string> {
    const url = this._buildUrl(endpoint);

    const credentials = { accessKey: this.accessKey, secretKey: this.secretKey };

    return await Signature.signRequestAsync(this.service, method, url, date, nonce, credentials, headers, body || {});
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

  protected async executeRequest(
    method: string,
    endpoint: string,
    date: Date,
    nonce: string,
    body: Record<string, any> | null = null,
    mode: string = 'asynchronous',
    timeout: number = this.timeout,
  ) {
    const url = this._buildUrl(endpoint);
    const headers: Record<string, string> = {
      'x-mesomb-date': String(date.getTime()),
      'x-mesomb-nonce': nonce,
      'Content-Type': 'application/json',
      'X-MeSomb-OperationMode': mode,
      'X-MeSomb-Source': `MeSombJS/v${MeSomb.VERSION}`,
      'Accept-Language': this.language,
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

    let authorization: string;
    if (method !== 'GET' && body) {
      authorization = await this._getAuthorization(
        method,
        endpoint,
        date,
        nonce,
        { 'content-type': 'application/json' },
        body,
      );
    } else {
      authorization = await this._getAuthorization(
        method,
        endpoint,
        date,
        nonce,
      );
    }
    headers.Authorization = authorization;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers,
        signal: controller.signal,
      });

      if (response.status >= 400) {
        await this._processClientException(response);
      }

      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}
