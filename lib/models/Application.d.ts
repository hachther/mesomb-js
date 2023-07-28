export default class Application {
    key: string;
    logo: string;
    private readonly balances;
    countries: string[];
    description: string;
    is_live: boolean;
    name: string;
    readonly security: any;
    status: 'LIVE' | 'PENDING' | 'DEVELOPMENT';
    url: string;
    constructor(data: Record<string, any>);
    /**
     * Get current balance
     *
     * @param country
     * @param service
     */
    getBalance(country?: string, service?: string): number;
}
