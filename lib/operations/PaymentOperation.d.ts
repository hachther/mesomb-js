import { Application, TransactionResponse } from '../models';
import 'isomorphic-fetch';
import { MoneyCollectRequest, MoneyDepositRequest, PaymentRefundRequest } from '../types';
import { AOperation } from './AOperation';
/**
 * Containing all operations provided by MeSomb Payment Service.
 *
 * [Check the documentation here](https://mesomb.hachther.com/en/api/schema/)
 */
export declare class PaymentOperation extends AOperation {
    service: string;
    constructor({ applicationKey, accessKey, secretKey, language, }: {
        applicationKey: string;
        accessKey: string;
        secretKey: string;
        language?: string;
    });
    /**
     * Collect money a user account
     *
     * @param {MoneyCollectRequest} params - collection parameter
     * @param {number} params.amount - Amount of the transaction
     * @param {'MTN' | 'ORANGE' | 'AIRTEL'} params.service - Payment service
     * @param {string} params.payer - Account number to collect from
     * @param {string} [params.nonce] - Unique string on each request
     * @param {string | number } [params.trxID] - If you want to include your transaction ID in the request
     * @param {string} [params.country='CM'] - 2 letters country code of the service (configured during your service registration in MeSomb)
     * @param {string} [params.currency='XAF'] - Currency of your service depending on your country
     * @param {boolean} [params.fees=true] - True if you want to include the fees in the amount
     * @param {string} [params.mode='synchronous'] - Mode of the transaction (synchronous or asynchronous)
     * @param {boolean} [params.conversion=false] - True in case of foreign currently defined if you want to rely on MeSomb to convert the amount in the local currency
     * @param {LocationRequest} [params.location] - Location of the customer
     * @param {CustomerRequest} [params.customer] - Customer details
     * @param {ProductRequest[] | ProductRequest} [params.products] - List of products
     * @param {Record<string, any>} [params.extra] - Additional parameters
     *
     * @returns {Promise<TransactionResponse>} - The transaction response
     *
     * @return TransactionResponse
     */
    makeCollect({ amount, service, payer, nonce, trxID, country, currency, fees, mode, conversion, location, customer, products, extra, }: MoneyCollectRequest): Promise<TransactionResponse>;
    /**
     * Collect money to a user account
     *
     * @param {MoneyDepositRequest} params - The deposit parameters
     * @param {number} params.amount - Amount of the transaction
     * @param {'MTN' | 'ORANGE' | 'AIRTEL'} params.service - Payment service
     * @param {string} params.receiver - Account number to depose in
     * @param {string} [params.nonce] - Unique string on each request
     * @param {string | number | null} [params.trxID] - If you want to include your transaction ID in the request
     * @param {string} [params.country='CM'] - 2 letters country code of the service (configured during your service registration in MeSomb)
     * @param {string} [params.currency='XAF'] - Currency of your service depending on your country
     * @param {boolean} [params.conversion=false] - True in case of foreign currently defined if you want to rely on MeSomb to convert the amount in the local currency
     * @param {LocationRequest} [params.location] - Location of the customer
     * @param {CustomerRequest} [params.customer] - Customer details
     * @param {ProductRequest[] | ProductRequest} [params.products] - List of products
     * @param {Record<string, any>} [params.extra] - Additional parameters
     * @returns {Promise<TransactionResponse>} - The transaction response
     */
    makeDeposit({ amount, service, receiver, nonce, trxID, country, currency, conversion, location, customer, products, extra, }: MoneyDepositRequest): Promise<TransactionResponse>;
    /**
     * Method to refund customer based on a transaction
     *
     * @param id of the transaction
     * @param params{PaymentRefundRequest} refund parameter
     *
     * @return TransactionResponse
     */
    refundTransaction(id: string, { amount, nonce, conversion, currency }: PaymentRefundRequest): Promise<TransactionResponse>;
    /**
     * Get the current status of your service on MeSomb
     */
    getStatus(): Promise<Application>;
    /**
     * Fetch transactions base on MeSomb IDs or external IDs
     *
     * @param ids: ids of the transactions
     * @param source: origin of the ID of the transactions (MESOMB for MeSomb and EXTERNAL for your system)
     *
     * @return Transaction[]
     */
    getTransactions(ids: string[], source?: 'MESOMB' | 'EXTERNAL'): Promise<Record<string, any>[]>;
    /**
     * Check transactions base on MeSomb IDs or external IDs
     *
     * @param ids: ids of the transactions
     * @param source: origin of the ID of the transactions (MESOMB for MeSomb and EXTERNAL for your system)
     *
     * @return Transaction[]
     */
    checkTransactions(ids: string[], source?: string): Promise<Record<string, any>[]>;
}
