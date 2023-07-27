import Application from '../models/Application';
import TransactionResponse from '../models/TransactionResponse';
import "isomorphic-fetch";
import { MoneyCollectRequest, MoneyDepositRequest } from "../types";
/**
 * Containing all operations provided by MeSomb Payment Service.
 *
 * [Check the documentation here](https://mesomb.hachther.com/en/api/schema/)
 */
export declare class PaymentOperation {
    /**
     * Your service application key on MeSomb
     *
     * @private
     */
    private readonly applicationKey;
    /**
     * Your access key provided by MeSomb
     *
     * @private
     */
    private readonly accessKey;
    /**
     * Your secret key provided by MeSomb
     *
     * @private
     */
    private readonly secretKey;
    constructor({ applicationKey, accessKey, secretKey, }: {
        applicationKey: string;
        accessKey: string;
        secretKey: string;
    });
    private _buildUrl;
    private _getAuthorization;
    private processClientException;
    /**
     * Collect money a user account
     * [Check the documentation here](https://mesomb.hachther.com/en/api/schema/)
     *
     * @param amount amount to collect
     * @param service MTN, ORANGE, AIRTEL
     * @param payer account number to collect from
     * @param date date of the request
     * @param nonce unique string on each request
     * @param trxID ID of the transaction in your system
     * @param country country CM, NE
     * @param currency code of the currency of the amount
     * @param feesIncluded if your want MeSomb to include and compute fees in the amount to collect
     * @param mode
     * @param conversion In case of foreign currently defined if you want to rely on MeSomb to convert the amount in the local currency
     * @param location object containing the location of the customer check the documentation
     * @param customer object containing information of the customer check the documentation
     * @param product object containing information of the product check the documentation
     * @param extra Extra parameter to send in the body check the API documentation
     *
     * @return TransactionResponse
     */
    makeCollect({ amount, service, payer, date, nonce, trxID, country, currency, feesIncluded, mode, conversion, location, customer, products, extra, }: MoneyCollectRequest): Promise<TransactionResponse>;
    /**
     * Method to make deposit in a receiver mobile account.
     * [Check the documentation here](https://mesomb.hachther.com/en/api/schema/)
     *
     * @param amount the amount of the transaction
     * @param service service code (MTN, ORANGE, AIRTEL, ...)
     * @param receiver receiver account (in the local phone number)
     * @param date date of the request
     * @param nonce Unique key generated for each transaction
     * @param trxID ID of the transaction in your system
     * @param country country code 'CM' by default
     * @param currency currency of the transaction (XAF, XOF, ...) XAF by default
     * @param location object containing the location of the customer check the documentation
     * @param customer object containing information of the customer check the documentation
     * @param product object containing information of the product check the documentation
     * @param extra Extra parameters to send in the body check the API documentation
     *
     * @return TransactionResponse
     */
    makeDeposit({ amount, service, receiver, date, nonce, trxID, country, currency, location, customer, products, extra }: MoneyDepositRequest): Promise<TransactionResponse>;
    /**
     * Update security parameters of your service on MeSomb
     *
     * @param field which security field you want to update (check API documentation)
     * @param action SET or UNSET
     * @param value value of the field
     * @param date date of the request
     *
     * @return Application
     */
    updateSecurity(field: string, action: 'SET' | 'UNSET', value?: any, date?: Date): Promise<Application>;
    /**
     * Get the current status of your service on MeSomb
     *
     * @param date date of the request
     */
    getStatus(date?: Date): Promise<Application>;
    getTransactions(ids: string[], date?: Date): Promise<Record<string, any>[]>;
}
