import CryptoJS from 'crypto-js';
import { buildCanonicalRequest, buildCanonicalRequestData } from './canonical.js';
import { RequestSigner, SignRequestParams } from './types.js';

export class CryptoJsSigner implements RequestSigner {
  public signRequest(params: SignRequestParams): string {
    const request = buildCanonicalRequestData(params);
    const payloadHash = CryptoJS.SHA1(params.body ? JSON.stringify(params.body) : '{}').toString();

    const canonicalRequest = buildCanonicalRequest(
      params.method,
      request.path,
      request.canonicalQuery,
      request.canonicalHeaders,
      request.signedHeaders,
      payloadHash,
    );

    const stringToSign = `${params.algorithm}\n${request.timestamp}\n${request.scope}\n${CryptoJS.SHA1(canonicalRequest).toString()}`;
    const signature = CryptoJS.HmacSHA1(stringToSign, params.credentials.secretKey).toString();

    return `${params.algorithm} Credential=${params.credentials.accessKey}/${request.scope}, SignedHeaders=${request.signedHeaders}, Signature=${signature}`;
  }
}



