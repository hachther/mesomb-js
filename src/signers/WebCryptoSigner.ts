import { buildCanonicalRequest, buildCanonicalRequestData } from './canonical.js';
import { RequestSigner, SignRequestParams } from './types.js';

const encoder = new TextEncoder();

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export class WebCryptoSigner implements RequestSigner {
  private readonly subtle: SubtleCrypto;

  public constructor(subtle?: SubtleCrypto) {
    const runtimeSubtle = subtle || (globalThis.crypto && globalThis.crypto.subtle);
    if (!runtimeSubtle) {
      throw new Error('Web Crypto API is not available in this runtime.');
    }
    this.subtle = runtimeSubtle;
  }

  private async sha1Hex(data: string): Promise<string> {
    const digest = await this.subtle.digest('SHA-1', encoder.encode(data));
    return toHex(digest);
  }

  private async hmacSha1Hex(data: string, secret: string): Promise<string> {
    const key = await this.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-1' },
      false,
      ['sign'],
    );
    const signed = await this.subtle.sign('HMAC', key, encoder.encode(data));
    return toHex(signed);
  }

  public async signRequest(params: SignRequestParams): Promise<string> {
    const request = buildCanonicalRequestData(params);
    const payloadHash = await this.sha1Hex(params.body ? JSON.stringify(params.body) : '{}');

    const canonicalRequest = buildCanonicalRequest(
      params.method,
      request.path,
      request.canonicalQuery,
      request.canonicalHeaders,
      request.signedHeaders,
      payloadHash,
    );

    const canonicalRequestHash = await this.sha1Hex(canonicalRequest);
    const stringToSign = `${params.algorithm}\n${request.timestamp}\n${request.scope}\n${canonicalRequestHash}`;
    const signature = await this.hmacSha1Hex(stringToSign, params.credentials.secretKey);

    return `${params.algorithm} Credential=${params.credentials.accessKey}/${request.scope}, SignedHeaders=${request.signedHeaders}, Signature=${signature}`;
  }
}

