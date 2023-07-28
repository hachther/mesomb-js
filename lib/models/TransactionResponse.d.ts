import Transaction from "./Transaction";
export default class TransactionResponse {
    readonly success: boolean;
    message: string;
    redirect: string;
    transaction: Transaction;
    reference: string;
    status: 'SUCCESS' | 'FAILED' | 'PENDING';
    constructor(data: Record<string, any>);
    isOperationSuccess(): boolean;
    isTransactionSuccess(): boolean;
}
