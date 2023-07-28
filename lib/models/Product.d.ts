export default class Product {
    name: string;
    category?: string;
    quantity: number;
    amount: number;
    constructor(data: Record<string, any>);
}
