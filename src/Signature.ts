import MeSomb from './MeSomb';
import { CryptoJsSigner } from './signers';
import { RequestSigner } from './signers';

export class Signature {
  private static signer: RequestSigner = new CryptoJsSigner();

  public static setSigner(signer: RequestSigner): void {
    this.signer = signer;
  }

  public static resetSigner(): void {
    this.signer = new CryptoJsSigner();
  }

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
    const result = this.signer.signRequest({
      algorithm: MeSomb.ALGORITHM,
      service,
      method,
      url,
      date,
      nonce,
      credentials,
      headers,
      body,
    });

    if (typeof (result as Promise<string>).then === 'function') {
      throw new Error('Current signer is async. Use Signature.signRequestAsync instead.');
    }

    return result as string;
  }

  public static async signRequestAsync(
    service: string,
    method: string,
    url: string,
    date: Date,
    nonce: string,
    credentials: {secretKey: string; accessKey: string},
    headers: Record<string, string> = {},
    body?: Record<string, any>,
  ): Promise<string> {
    return await this.signer.signRequest({
      algorithm: MeSomb.ALGORITHM,
      service,
      method,
      url,
      date,
      nonce,
      credentials,
      headers,
      body,
    });
  }
}
