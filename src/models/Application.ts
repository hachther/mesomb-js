/**
 * Application model
 *
 * @property {string} key - Application key
 * @property {string} logo - Application logo
 * @property {Array<{ country: string; service: string; value: number }>} balances - Application balances
 * @property {string[]} countries - Application countries
 * @property {string} description - Application description
 * @property {string} name - Application name
 * @property {any} security - Application security
 * @property {string} url - Application url
 */
export default class Application {
  public key: string;
  public logo: string;
  private readonly balances: { country: string; service: string; value: number }[];
  public countries: string[];
  public description: string;
  public name: string;
  public readonly security: any;
  public url: string;

  public constructor(data: { key: string; logo: string; balances: { country: string; service: string; value: number }[]; countries: string[]; description: string; name: string; security: any; url: string }) {
    this.key = data.key;
    this.logo = data.logo;
    this.balances = data.balances;
    this.countries = data.countries;
    this.description = data.description;
    this.name = data.name;
    this.security = data.security;
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
