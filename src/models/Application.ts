export default class Application {
  public key: string;
  public logo: string;
  private readonly balances: { country: string; service: string; value: number }[];
  public countries: string[];
  public description: string;
  // tslint:disable-next-line:variable-name
  public is_live: boolean;
  public name: string;
  public readonly security: any;
  public status: 'LIVE' | 'PENDING' | 'DEVELOPMENT';
  public url: string;

  public constructor(data: Record<string, any>) {
    this.key = data.key;
    this.logo = data.logo;
    this.balances = data.balances;
    this.countries = data.countries;
    this.description = data.description;
    this.is_live = data.is_live;
    this.name = data.name;
    this.security = data.security;
    this.status = data.status;
    this.url = data.url;
  }

  /**
   * Get current balance
   *
   * @param country
   * @param service
   */
  public getBalance(country?: string, service?: string) {
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
