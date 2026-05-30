import { AOperation } from './AOperation';
import RandomGenerator from '../util/RandomGenerator';
import CheckoutSession from '../models/CheckoutSession';

export class CheckoutSessionOperation extends AOperation {
  protected service = 'payment';

  public constructor({
    applicationKey,
    accessKey,
    secretKey,
    language = 'en',
    timeout,
  }: {
    applicationKey: string;
    accessKey: string;
    secretKey: string;
    language?: string;
    timeout?: number;
  }) {
    super({ target: applicationKey, accessKey, secretKey, language, timeout });
  }

  public async create(data: Record<string, any>): Promise<CheckoutSession> {
    const endpoint = 'checkout/sessions/';
    const nonce = data.nonce ?? RandomGenerator.nonce();
    const { nonce: _nonce, ...body } = data;

    return new CheckoutSession(await this.executeRequest('POST', endpoint, new Date(), nonce, body));
  }

  public async retrieve(id: string): Promise<CheckoutSession> {
    const endpoint = `checkout/sessions/${id}/`;
    return new CheckoutSession(await this.executeRequest('GET', endpoint, new Date(), RandomGenerator.nonce()));
  }

  public async expire(id: string): Promise<CheckoutSession> {
    const endpoint = `checkout/sessions/${id}/expire/`;
    return new CheckoutSession(await this.executeRequest('PATCH', endpoint, new Date(), RandomGenerator.nonce()));
  }

  public async delete(id: string): Promise<void> {
    const endpoint = `checkout/sessions/${id}/`;
    await this.executeRequest('DELETE', endpoint, new Date(), RandomGenerator.nonce());
  }
}

