import MeSomb from './MeSomb';

export class Signature {
  public static signRequest(
    service: string,
    method: string,
    url: string,
    date: Date,
    nonce: string,
    credentials: {secretKey: string; accessKey: string},
    headers: Record<string, string> = {},
    body?: Record<string, any>,
  ): string {
    const algorithm = MeSomb.ALGORITHM;

    const URL = require('url-parse');
    const parse = new URL(url);
    let canonicalQuery = '';
    if (parse.query) {
      canonicalQuery = parse.query.substring(1);
    }

    const timestamp = date.getTime();

    headers.host = `${parse.protocol}//${parse.host}`;
    headers['x-mesomb-date'] = String(timestamp);
    headers['x-mesomb-nonce'] = nonce;

    const headersKeys = Object.keys(headers).sort();

    const canonicalHeaders = headersKeys.map((key) => `${key}:${headers[key]}`).join('\n');

    const CryptoJS = require('crypto-js');

    const payloadHash = CryptoJS.SHA1(body ? JSON.stringify(body) : '{}').toString();

    const signedHeaders = headersKeys.join(';');

    const path = encodeURI(parse.pathname);

    const canonicalRequest = `${method}\n${path}\n${canonicalQuery}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;

    const scope = `${date.getFullYear()}${date.getMonth()}${date.getDate()}/${service}/mesomb_request`;

    const stringToSign = `${algorithm}\n${timestamp}\n${scope}\n${CryptoJS.SHA1(canonicalRequest).toString()}`;

    const signature = CryptoJS.HmacSHA1(stringToSign, credentials.secretKey).toString();

    return `${algorithm} Credential=${credentials.accessKey}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
  }
}
