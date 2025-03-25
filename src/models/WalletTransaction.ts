/**
 * WalletTransaction model
 *
 * @property {string} id - The transaction's id
 * @property {string} status - The transaction's status
 * @property {string} type - The transaction's type
 * @property {number} amount - The transaction's amount
 * @property {-1 | 1} direction - The transaction's direction
 * @property {string} wallet - The transaction's wallet
 * @property {number} balanceAfter - The balance after the transaction
 * @property {Date} date - The transaction's date
 * @property {string} country - The transaction's country
 * @property {string} finTrxId - The transaction's financial transaction id
 */
export default class WalletTransaction {
  private readonly data: Record<string, any>;

  public id: number;
  public status: string;
  public type: string;
  public amount: number;
  public direction: -1 | 1;
  public wallet: string;
  public balanceAfter: number;
  public date: Date;
  public country: string;
  public finTrxId: string;

  public constructor(data: {id: number; status: string; type: string; amount: number; direction: -1 | 1; wallet: string; balance_after: number; ts: string; country: string; fin_trx_id: string}) {
    this.data = data;

    this.id = data.id;
    this.status = data.status;
    this.type = data.type;
    this.amount = data.amount;
    this.direction = data.direction;
    this.wallet = data.wallet;
    this.balanceAfter = data.balance_after;
    this.date = new Date(data.ts);
    this.country = data.country;
    this.finTrxId = data.fin_trx_id;
  }

  /**
   * @return {Record<string, any>} data from the server
   */
  public getData(): Record<string, any> {
    return this.data;
  }
}
