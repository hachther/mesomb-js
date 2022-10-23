export class TransactionResponse {
  private readonly success: boolean;
  private message: string;
  private redirect: string;
  private data: Record<string, any>;
  private reference: string;
  private status: 'SUCCESS' | 'FAILED' | 'PENDING';

  constructor(data: Record<string, any>) {
    this.success = data.success;
    this.message = data.message;
    this.redirect = data.redirect;
    this.data = data.transaction;
    this.reference = data.reference;
    this.status = data.status;
  }

  public isOperationSuccess(): boolean {
    return this.success;
  }

  public isTransactionSuccess(): boolean {
    return this.success && this.status === 'SUCCESS';
  }
}

export class Application {
  key: string;
  logo: string;
  private readonly balances: { country: string; service: string; value: number }[];
  countries: string[];
  description: string;
  isLive: boolean;
  name: string;
  private readonly security: any;
  status: 'LIVE' | 'PENDING' | 'DEVELOPMENT';
  url: string;

  public constructor(data: Record<string, any>) {
    this.key = data.key;
    this.logo = data.logo;
    this.balances = data.balances;
    this.countries = data.countries;
    this.description = data.description;
    this.isLive = data.is_live;
    this.name = data.name;
    this.security = data.security;
    this.status = data.status;
    this.url = data.url;
  }

  public getSecurityField(field: string) {
    return this.security[field];
  }

  /**
   * Get current balance
   *
   * @param country
   * @param service
   */
  public getBalance(country: string | undefined = undefined, service: string | undefined = undefined) {
    let balances = this.balances;

    if (country) {
      balances = balances.filter((b) => b.country === country);
    }

    if (service) {
      balances = balances.filter((b) => b.service === service);
    }

    return balances.reduce((acc, item) => acc + item.value, 0);
  }
}
