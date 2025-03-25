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
    key: string;
    logo: string;
    private readonly balances;
    countries: string[];
    description: string;
    name: string;
    readonly security: any;
    url: string;
    constructor(data: {
        key: string;
        logo: string;
        balances: {
            country: string;
            service: string;
            value: number;
        }[];
        countries: string[];
        description: string;
        name: string;
        security: any;
        url: string;
    });
    /**
     * Get current balance
     *
     * @param country
     * @param service
     */
    getBalance(country?: string, service?: string): number;
}
