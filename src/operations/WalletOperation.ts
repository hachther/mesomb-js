import { AOperation } from './AOperation';
import { WalletCreationRequest } from '../types';
import Wallet from '../models/Wallet';
import { RandomGenerator } from '../util/RandomGenerator';
import WalletTransaction from '../models/WalletTransaction';
import PaginatedWallets from '../models/PaginatedWallets';
import PaginatedWalletTransactions from '../models/PaginatedWalletTransactions';

export class WalletOperation extends AOperation {
  service = 'wallet';

  public constructor({
    providerKey,
    accessKey,
    secretKey,
  }: {
    providerKey: string;
    accessKey: string;
    secretKey: string;
  }) {
    super({ target: providerKey, accessKey, secretKey });
  }

  /**
   * Create a wallet for a user
   *
   * @param firstName of the wallet owner
   * @param lastName of the wallet owner
   * @param email of the wallet owner
   * @param phoneNumber of the wallet owner
   * @param country of the wallet owner
   * @param gender of the wallet owner
   * @param nonce unique string on each request
   */
  public async createWallet({
    firstName,
    lastName,
    email,
    phoneNumber,
    country = 'CM',
    gender,
    nonce,
  }: WalletCreationRequest): Promise<Wallet> {
    const endpoint = 'wallet/wallets/';

    const body: Record<string, any> = {
      first_name: firstName,
      last_name: lastName,
      email,
      country,
      phone_number: phoneNumber,
      gender,
    };

    return new Wallet(await this.executeRequest('POST', endpoint, new Date(), nonce, body));
  }

  /**
   * Get a wallet by its id
   *
   * @param id of the wallet to get
   */
  public async getWallet(id: number): Promise<Wallet> {
    const endpoint = `wallet/wallets/${id}/`;

    return new Wallet(await this.executeRequest('GET', endpoint, new Date(), RandomGenerator.nonce()));
  }

  /**
   * Get a paginated list of wallets
   *
   * @param page of the wallet to get
   */
  public async getWallets(page: number = 1): Promise<PaginatedWallets> {
    const endpoint = `wallet/wallets/?page=${page}`;

    return new PaginatedWallets(await this.executeRequest('GET', endpoint, new Date(), RandomGenerator.nonce()));
  }

  /**
   * Create a wallet for a user
   *
   * @param id of the wallet to update
   * @param firstName of the wallet owner
   * @param lastName of the wallet owner
   * @param email of the wallet owner
   * @param phoneNumber of the wallet owner
   * @param country of the wallet owner
   * @param gender of the wallet owner
   * @param nonce unique string on each request
   */
  public async updateWallet(
    id: number,
    { firstName, lastName, email, phoneNumber, country = 'CM', gender, nonce }: WalletCreationRequest,
  ): Promise<Wallet> {
    const endpoint = `wallet/wallets/${id}/`;

    const body: Record<string, any> = {
      first_name: firstName,
      last_name: lastName,
      email,
      country,
      phone_number: phoneNumber,
      gender,
    };

    return new Wallet(await this.executeRequest('PUT', endpoint, new Date(), nonce, body));
  }

  /**
   * Get a wallet by its id
   *
   * @param id of the wallet to get
   */
  public async deleteWallet(id: number): Promise<void> {
    const endpoint = `wallet/wallets/${id}/`;

    return await this.executeRequest('DELETE', endpoint, new Date(), RandomGenerator.nonce());
  }

  /**
   * Remove money from a wallet
   * @param wallet id
   * @param amount to add
   * @param force to force the operation if balance is not enough
   */
  public async removeMoney(wallet: number, amount: number, force: boolean = false): Promise<WalletTransaction> {
    const endpoint = `wallet/wallets/${wallet}/adjust/`;

    return new WalletTransaction(await this.executeRequest('POST', endpoint, new Date(), RandomGenerator.nonce(), { amount, force, direction: -1 }));
  }

  /**
   * Add money to a wallet
   * @param wallet id
   * @param amount to add
   */
  public async addMoney(wallet: number, amount: number): Promise<WalletTransaction> {
    const endpoint = `wallet/wallets/${wallet}/adjust/`;

    return new WalletTransaction(await this.executeRequest('POST', endpoint, new Date(), RandomGenerator.nonce(), { amount, direction: 1 }));
  }

  /**
   * Get a transaction
   * @param id of the transaction
   */
  public async getTransaction(id: number): Promise<WalletTransaction> {
    const endpoint = `wallet/transactions/${id}/`;

    return new WalletTransaction(await this.executeRequest('GET', endpoint, new Date(), RandomGenerator.nonce()));
  }

  /**
   * Get a transaction
   * @param page of the transaction
   * @param wallet id of the wallet
   */
  public async getTransactions(page: number, wallet?: number): Promise<PaginatedWalletTransactions> {
    const endpoint = `wallet/transactions/?page=${page}${wallet ? `&wallet=${wallet}` : ''}`;

    return new PaginatedWalletTransactions(await this.executeRequest('GET', endpoint, new Date(), RandomGenerator.nonce()));
  }
}
