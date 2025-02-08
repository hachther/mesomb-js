export default class WalletTransaction {
  private readonly data: Record<string, any>;

  public id: string;
  public status: string;
  public type: string;
  public amount: number;
  public direction: -1 | 1;
  public wallet: string;
  public balanceAfter: number;
  public date: Date;
  public country: string;
  public finTrxId: string;

  public constructor(data: Record<string, any>) {
    this.data = data;

    this.id = data.pk;
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
   * @return: data from the server
   */
  public toJSON(): Record<string, any> {
    return this.data;
  }
}
