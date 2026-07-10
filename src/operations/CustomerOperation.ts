import { AOperation } from './AOperation.js';
import RandomGenerator from '../util/RandomGenerator.js';
import MerchantCustomer from '../models/MerchantCustomer.js';
import PaginatedMerchantCustomers from '../models/PaginatedMerchantCustomers.js';

export class CustomerOperation extends AOperation {
  protected service = 'payment';

  public constructor({
    accessKey,
    secretKey,
    language = 'en',
    timeout,
  }: {
    accessKey: string;
    secretKey: string;
    language?: string;
    timeout?: number;
  }) {
    super({ target: '', accessKey, secretKey, language, timeout });
  }

  public async list(page: number = 1): Promise<PaginatedMerchantCustomers> {
    const endpoint = `customers/?page=${page}`;
    return new PaginatedMerchantCustomers(
      await this.executeRequest('GET', endpoint, new Date(), RandomGenerator.nonce()),
    );
  }

  public async create(data: Record<string, any>): Promise<MerchantCustomer> {
    const endpoint = 'customers/';
    return new MerchantCustomer(await this.executeRequest('POST', endpoint, new Date(), RandomGenerator.nonce(), data));
  }

  public async retrieve(id: number): Promise<MerchantCustomer> {
    const endpoint = `customers/${id}/`;
    return new MerchantCustomer(await this.executeRequest('GET', endpoint, new Date(), RandomGenerator.nonce()));
  }

  public async update(id: number, data: Record<string, any>): Promise<MerchantCustomer> {
    const endpoint = `customers/${id}/`;
    return new MerchantCustomer(await this.executeRequest('PUT', endpoint, new Date(), RandomGenerator.nonce(), data));
  }

  public async patch(id: number, data: Record<string, any>): Promise<MerchantCustomer> {
    const endpoint = `customers/${id}/`;
    return new MerchantCustomer(
      await this.executeRequest('PATCH', endpoint, new Date(), RandomGenerator.nonce(), data),
    );
  }

  public async delete(id: number): Promise<void> {
    const endpoint = `customers/${id}/`;
    await this.executeRequest('DELETE', endpoint, new Date(), RandomGenerator.nonce());
  }
}

