export default class Customer {
    email: string;
    phone: string;
    town: string;
    region: string;
    country: string;
    first_name: string;
    last_name: string;
    address: string;
    constructor(data: Record<string, any>);
}
