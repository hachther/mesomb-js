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
    language = 'en',
  }: {
    providerKey: string;
    accessKey: string;
    secretKey: string;
    language?: string;
  }) {
    super({ target: providerKey, accessKey, secretKey, language });
  }

  /**
   * Create a wallet for a user
   *
   * @param {WalletCreationRequest} data to create a wallet
   * @param {string} [data.firstName] of the wallet owner
   * @param {string} data.lastName of the wallet owner
   * @param {string} [data.email] of the wallet owner
   * @param {string} data.phoneNumber of the wallet owner
   * @param {string} [data.country=CM] of the wallet owner
   * @param {string} data.gender of the wallet owner
   * @param {string} [data.nonce] unique string on each request
   * @param {string} [data.number] The unique numeric wallet identifier, if not set we will generate one for you
   *
   * @returns {Wallet} wallet
   */
  public async createWallet({
    firstName,
    lastName,
    email,
    phoneNumber,
    country = 'CM',
    gender,
    nonce,
    number: accNumber,
  }: WalletCreationRequest): Promise<Wallet> {
    const endpoint = 'wallet/wallets/';

    const body: Record<string, any> = {
      last_name: lastName,
      country,
      phone_number: phoneNumber,
      gender,
    };
    if (firstName) {
      body.first_name = firstName;
    }
    if (email) {
      body.email = email;
    }
    if (accNumber) {
      body.number = accNumber;
    }

    return new Wallet(await this.executeRequest('POST', endpoint, new Date(), nonce ?? RandomGenerator.nonce(), body));
  }

  /**
   * Get a wallet by its id
   *
   * @param {number} id of the wallet to get
   *
   * @returns {Wallet} wallet
   */
  public async getWallet(id: number): Promise<Wallet> {
    const endpoint = `wallet/wallets/${id}/`;

    return new Wallet(await this.executeRequest('GET', endpoint, new Date(), RandomGenerator.nonce()));
  }

  /**
   * Get a paginated list of wallets
   *
   * @param {number} page of the wallet to get
   *
   * @returns {PaginatedWallets} paginated wallets
   */
  public async getWallets(page: number = 1): Promise<PaginatedWallets> {
    const endpoint = `wallet/wallets/?page=${page}`;

    return new PaginatedWallets(await this.executeRequest('GET', endpoint, new Date(), RandomGenerator.nonce()));
  }

  /**
   * Create a wallet for a user
   * @param id of the wallet to update
   * @param {WalletCreationRequest} data to update
   * @param {string} [data.firstName] of the wallet owner
   * @param {string} data.lastName of the wallet owner
   * @param {string} [data.email] of the wallet owner
   * @param {string} data.phoneNumber of the wallet owner
   * @param {string} [data.country=CM] of the wallet owner
   * @param {string} data.gender of the wallet owner
   * @param {string} [data.nonce] unique string on each request
   */
  public async updateWallet(
    id: number,
    { firstName, lastName, email, phoneNumber, country = 'CM', gender, nonce }: WalletCreationRequest,
  ): Promise<Wallet> {
    const endpoint = `wallet/wallets/${id}/`;

    const body: Record<string, any> = {
      last_name: lastName,
      country,
      phone_number: phoneNumber,
      gender,
    };
    if (firstName) {
      body.first_name = firstName;
    }
    if (email) {
      body.email = email;
    }

    return new Wallet(await this.executeRequest('PUT', endpoint, new Date(), nonce ?? RandomGenerator.nonce(), body));
  }

  /**
   * Get a wallet by its id
   *
   * @param {number} id of the wallet to get
   */
  public async deleteWallet(id: number): Promise<void> {
    const endpoint = `wallet/wallets/${id}/`;

    await this.executeRequest('DELETE', endpoint, new Date(), RandomGenerator.nonce());
  }

  /**
   * Remove money from a wallet
   * @param {number} wallet id
   * @param {amount} amount to add
   * @param {boolean} force to force the operation if balance is not enough
   *
   * @returns {WalletTransaction} transaction
   */
  public async removeMoney(wallet: number, amount: number, force: boolean = false): Promise<WalletTransaction> {
    const endpoint = `wallet/wallets/${wallet}/adjust/`;

    return new WalletTransaction(
      await this.executeRequest('POST', endpoint, new Date(), RandomGenerator.nonce(), {
        amount,
        force,
        direction: -1,
      }),
    );
  }

  /**
   * Add money to a wallet
   *
   * @param {number} wallet id
   * @param {number} amount to add
   *
   * @returns {WalletTransaction} transaction
   */
  public async addMoney(wallet: number, amount: number): Promise<WalletTransaction> {
    const endpoint = `wallet/wallets/${wallet}/adjust/`;

    return new WalletTransaction(
      await this.executeRequest('POST', endpoint, new Date(), RandomGenerator.nonce(), { amount, direction: 1 }),
    );
  }

  /**
   * Transfer money from a wallet to another
   *
   * @param {number} from wallet id
   * @param {number} to wallet id
   * @param {number} amount to transfer
   * @param {boolean} force to force the operation if balance is not enough
   *
   * @returns {WalletTransaction} transaction
   */
  public async transferMoney(from: number, to: number, amount: number, force: boolean = false): Promise<WalletTransaction> {
    const endpoint = `wallet/wallets/${from}/transfer/`;
    const body = {
      amount,
      to,
      force,
    }

    return new WalletTransaction(
      await this.executeRequest('POST', endpoint, new Date(), RandomGenerator.nonce(), body),
    );
  }

  /**
   * Get a transaction
   *
   * @param {number} id of the transaction
   *
   * @returns {WalletTransaction} transaction
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

    return new PaginatedWalletTransactions(
      await this.executeRequest('GET', endpoint, new Date(), RandomGenerator.nonce()),
    );
  }
}
