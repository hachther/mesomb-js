import { AOperation } from './AOperation';
import RandomGenerator from '../util/RandomGenerator';
import MerchantProduct from '../models/MerchantProduct';
import PaginatedMerchantProducts from '../models/PaginatedMerchantProducts';

export class ProductOperation extends AOperation {
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

  public async list(page: number = 1): Promise<PaginatedMerchantProducts> {
    const endpoint = `products/?page=${page}`;
    return new PaginatedMerchantProducts(
      await this.executeRequest('GET', endpoint, new Date(), RandomGenerator.nonce()),
    );
  }

  public async create(data: Record<string, any>): Promise<MerchantProduct> {
    const endpoint = 'products/';
    return new MerchantProduct(await this.executeRequest('POST', endpoint, new Date(), RandomGenerator.nonce(), data));
  }

  public async retrieve(id: string): Promise<MerchantProduct> {
    const endpoint = `products/${id}/`;
    return new MerchantProduct(await this.executeRequest('GET', endpoint, new Date(), RandomGenerator.nonce()));
  }

  public async update(id: string, data: Record<string, any>): Promise<MerchantProduct> {
    const endpoint = `products/${id}/`;
    return new MerchantProduct(await this.executeRequest('PUT', endpoint, new Date(), RandomGenerator.nonce(), data));
  }

  public async patch(id: string, data: Record<string, any>): Promise<MerchantProduct> {
    const endpoint = `products/${id}/`;
    return new MerchantProduct(await this.executeRequest('PATCH', endpoint, new Date(), RandomGenerator.nonce(), data));
  }

  public async delete(id: string): Promise<void> {
    const endpoint = `products/${id}/`;
    await this.executeRequest('DELETE', endpoint, new Date(), RandomGenerator.nonce());
  }
}

