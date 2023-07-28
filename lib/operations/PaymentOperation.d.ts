import { Application, TransactionResponse } from '../models';
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
    private _executeRequest;
    /**
     * Collect money a user account
     * [Check the documentation here](https://mesomb.hachther.com/en/api/schema/)
     *
     * @param amount: amount to collect
     * @param service: payment service with the possible values MTN, ORANGE, AIRTEL
     * @param payer: account number to collect from
     * @param date: date of the request
     * @param nonce: unique string on each request
     * @param country: 2 letters country code of the service (configured during your service registration in MeSomb)
     * @param currency: currency of your service depending on your country
     * @param fees: false if your want MeSomb fees to be computed and included in the amount to collect
     * @param mode: asynchronous or synchronous
     * @param conversion: true in case of foreign currently defined if you want to rely on MeSomb to convert the amount in the local currency
     * @param location: Map containing the location of the customer with the following attributes: town, region and location all string.
     * @param products: It is ArrayList of products. Each product are Map with the following attributes: name string, category string, quantity int and amount float
     * @param customer: a Map containing information about the customer: phone string, email: string, first_name string, last_name string, address string, town string, region string and country string
     * @param trxID: if you want to include your transaction ID in the request
     * @param extra: Map to add some extra attribute depending on the API documentation
     *
     * @return TransactionResponse
     */
    makeCollect({ amount, service, payer, date, nonce, trxID, country, currency, feesIncluded, mode, conversion, location, customer, products, extra, }: MoneyCollectRequest): Promise<TransactionResponse>;
    /**
     * Method to make deposit in a receiver mobile account.
     * [Check the documentation here](https://mesomb.hachther.com/en/api/schema/)
     *
     * @param amount: amount to collect
     * @param service: payment service with the possible values MTN, ORANGE, AIRTEL
     * @param receiver: account number to collect from
     * @param date: date of the request
     * @param nonce: unique string on each request
     * @param country: 2 letters country code of the service (configured during your service registration in MeSomb)
     * @param currency: currency of your service depending on your country
     * @param fees: false if your want MeSomb fees to be computed and included in the amount to collect
     * @param conversion: true in case of foreign currently defined if you want to rely on MeSomb to convert the amount in the local currency
     * @param location: Map containing the location of the customer with the following attributes: town, region and location all string.
     * @param products: It is ArrayList of products. Each product are Map with the following attributes: name string, category string, quantity int and amount float
     * @param customer: a Map containing information about the customer: phone string, email: string, first_name string, last_name string, address string, town string, region string and country string
     * @param trxID: if you want to include your transaction ID in the request
     * @param extra: Map to add some extra attribute depending on the API documentation
     *
     * @return TransactionResponse
     */
    makeDeposit({ amount, service, receiver, date, nonce, trxID, country, currency, conversion, location, customer, products, extra }: MoneyDepositRequest): Promise<TransactionResponse>;
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
    getTransactions(ids: string[], source?: string): Promise<Record<string, any>[]>;
    checkTransactions(ids: string[], source?: string): Promise<Record<string, any>[]>;
}
