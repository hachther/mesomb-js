import { TransactionData } from "../types";
export default class TransactionResponse {
    readonly success: boolean;
    message: string;
    redirect: string;
    data: TransactionData;
    reference: string;
    status: 'SUCCESS' | 'FAILED' | 'PENDING';
    constructor(data: Record<string, any>);
    isOperationSuccess(): boolean;
    isTransactionSuccess(): boolean;
}
