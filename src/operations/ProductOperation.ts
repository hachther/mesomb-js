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

  public async listProducts(page: number = 1): Promise<PaginatedMerchantProducts> {
    const endpoint = `products/?page=${page}`;
    return new PaginatedMerchantProducts(
      await this.executeRequest('GET', endpoint, new Date(), RandomGenerator.nonce()),
    );
  }

  public async createProduct(data: Record<string, any>): Promise<MerchantProduct> {
    const endpoint = 'products/';
    return new MerchantProduct(await this.executeRequest('POST', endpoint, new Date(), RandomGenerator.nonce(), data));
  }

  public async getProduct(id: string): Promise<MerchantProduct> {
    const endpoint = `products/${id}/`;
    return new MerchantProduct(await this.executeRequest('GET', endpoint, new Date(), RandomGenerator.nonce()));
  }

  public async updateProduct(id: string, data: Record<string, any>): Promise<MerchantProduct> {
    const endpoint = `products/${id}/`;
    return new MerchantProduct(await this.executeRequest('PUT', endpoint, new Date(), RandomGenerator.nonce(), data));
  }

  public async patchProduct(id: string, data: Record<string, any>): Promise<MerchantProduct> {
    const endpoint = `products/${id}/`;
    return new MerchantProduct(await this.executeRequest('PATCH', endpoint, new Date(), RandomGenerator.nonce(), data));
  }

  public async deleteProduct(id: string): Promise<void> {
    const endpoint = `products/${id}/`;
    await this.executeRequest('DELETE', endpoint, new Date(), RandomGenerator.nonce());
  }
}

