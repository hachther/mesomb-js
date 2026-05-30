import { AOperation } from './AOperation';
import RandomGenerator from '../util/RandomGenerator';
import MerchantCustomer from '../models/MerchantCustomer';
import PaginatedMerchantCustomers from '../models/PaginatedMerchantCustomers';

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

  public async listCustomers(page: number = 1): Promise<PaginatedMerchantCustomers> {
    const endpoint = `customers/?page=${page}`;
    return new PaginatedMerchantCustomers(
      await this.executeRequest('GET', endpoint, new Date(), RandomGenerator.nonce()),
    );
  }

  public async createCustomer(data: Record<string, any>): Promise<MerchantCustomer> {
    const endpoint = 'customers/';
    return new MerchantCustomer(await this.executeRequest('POST', endpoint, new Date(), RandomGenerator.nonce(), data));
  }

  public async getCustomer(id: number): Promise<MerchantCustomer> {
    const endpoint = `customers/${id}/`;
    return new MerchantCustomer(await this.executeRequest('GET', endpoint, new Date(), RandomGenerator.nonce()));
  }

  public async updateCustomer(id: number, data: Record<string, any>): Promise<MerchantCustomer> {
    const endpoint = `customers/${id}/`;
    return new MerchantCustomer(await this.executeRequest('PUT', endpoint, new Date(), RandomGenerator.nonce(), data));
  }

  public async patchCustomer(id: number, data: Record<string, any>): Promise<MerchantCustomer> {
    const endpoint = `customers/${id}/`;
    return new MerchantCustomer(
      await this.executeRequest('PATCH', endpoint, new Date(), RandomGenerator.nonce(), data),
    );
  }

  public async deleteCustomer(id: number): Promise<void> {
    const endpoint = `customers/${id}/`;
    await this.executeRequest('DELETE', endpoint, new Date(), RandomGenerator.nonce());
  }
}

