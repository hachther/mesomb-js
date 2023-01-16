import Settings from './Settings';

export class Signature {
  public static nonceGenerator(length = 40) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public static signRequest(
    service: string,
    method: string,
    url: string,
    date: Date,
    nonce: string,
    credentials: Record<string, string>,
    headers: Record<string, string> = {},
    body: Record<string, any> | undefined = undefined,
  ): string {
    const algorithm = Settings.ALGORITHM;
    const parse = new URL(url);
    const canonicalQuery = parse.searchParams.toString();

    const timestamp = date.getTime();

    headers.host = `${parse.protocol}//${parse.host}`;
    headers['x-mesomb-date'] = String(timestamp);
    headers['x-mesomb-nonce'] = nonce;

    const headersKeys = Object.keys(headers).sort();

    const canonicalHeaders = headersKeys.map((key) => `${key}:${headers[key]}`).join('\n');

    const crypto = require('crypto');
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
