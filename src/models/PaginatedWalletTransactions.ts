import Wallet from './Wallet';
import WalletTransaction from './WalletTransaction';

export default class PaginatedWalletTransactions {
  private readonly data: Record<string, any>;

  public count: number;
  public next: string;
  public previous: string;
  public results: Wallet[];

  public constructor(data: Record<string, any>) {
    this.data = data;

    this.count = data.count;
    this.next = data.next;
    this.previous = data.previous;
    this.results = data.results.map((d: Record<string, any>) => new WalletTransaction(d));
  }

  /**
   * @return: data from the server
   */
  public toJSON(): Record<string, any> {
    return this.data;
  }
}
