export default class Application {
    key: string;
    logo: string;
    private readonly balances;
    countries: string[];
    description: string;
    isLive: boolean;
    name: string;
    private readonly security;
    status: 'LIVE' | 'PENDING' | 'DEVELOPMENT';
    url: string;
    constructor(data: Record<string, any>);
    getSecurityField(field: string): any;
    /**
     * Get current balance
     *
     * @param country
     * @param service
     */
    getBalance(country?: string, service?: string): number;
}
