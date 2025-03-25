import MeSomb from './MeSomb';

/**
 * @class Signature
 */
export class Signature {

  /**
   * @method signRequest
   *
   * @param {string} service - The targeted service
   * @param {string} method - The HTTP method
   * @param {string} url - The URL
   * @param {Date} date - The date
   * @param {string} nonce - The nonce
   * @param {{ accessKey: string, secretKey: string }} credentials - The credentials
   * @param {Record<string, string>} [headers={}] - The headers
   * @param {Record<string, any>} [body] - The body
   */
  public static signRequest(
    service: string,
    method: string,
    url: string,
    date: Date,
    nonce: string,
    credentials: { accessKey: string, secretKey: string },
    headers: Record<string, string> = {},
    body?: Record<string, any> | undefined,
  ): string {
    const algorithm = MeSomb.ALGORITHM;
    const parse = new URL(url);
    const canonicalQuery = parse.searchParams.toString();

    const timestamp = date.getTime();

    headers.host = `${parse.protocol}//${parse.host}`;
    headers['x-mesomb-date'] = String(timestamp);
    headers['x-mesomb-nonce'] = nonce;

    const headersKeys = Object.keys(headers).sort();

    const canonicalHeaders = headersKeys.map((key) => `${key}:${headers[key]}`).join('\n');

    const crypto = require('./crypto-custom.js');
    const payloadSha1 = crypto.createHash('sha1');
    const canonicalSha1 = crypto.createHash('sha1');
    const hmac = crypto.createHmac('sha1', credentials.secretKey);

    payloadSha1.update(body ? JSON.stringify(body) : '{}')
    const payloadHash = payloadSha1.digest('hex');

    const signedHeaders = headersKeys.join(';');

    const path = encodeURI(parse.pathname);

    const canonicalRequest = `${method}\n${path}\n${canonicalQuery}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;

    const scope = `${date.getFullYear()}${date.getMonth()}${date.getDate()}/${service}/mesomb_request`;

    canonicalSha1.update(canonicalRequest)
    const stringToSign = `${algorithm}\n${timestamp}\n${scope}\n${canonicalSha1.digest('hex')}`;

    const signature = hmac.update(stringToSign).digest('hex');

    return `${algorithm} Credential=${credentials.accessKey}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
  }
}
