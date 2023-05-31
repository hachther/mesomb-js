"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentOperation = void 0;
const Settings_1 = require("../Settings");
const Signature_1 = require("../Signature");
const exceptions_1 = require("../exceptions");
const models_1 = require("../models");
require("isomorphic-fetch");
/**
 * Containing all operations provided by MeSomb Payment Service.
 *
 * [Check the documentation here](https://mesomb.hachther.com/en/api/schema/)
 */
class PaymentOperation {
    constructor({ applicationKey, accessKey, secretKey, }) {
        this.applicationKey = applicationKey;
        this.accessKey = accessKey;
        this.secretKey = secretKey;
    }
    _buildUrl(endpoint) {
        return `${Settings_1.default.HOST}/en/api/${Settings_1.default.APIVERSION}/${endpoint}`;
    }
    _getAuthorization(method, endpoint, date, nonce, headers = {}, body = undefined) {
        const url = this._buildUrl(endpoint);
        const credentials = { accessKey: this.accessKey, secretKey: this.secretKey };
        return Signature_1.Signature.signRequest('payment', method, url, date, nonce, credentials, headers, body || {});
    }
    async processClientException(response) {
        let message = await response.text();
        let code;
        if (message.startsWith('{')) {
            const data = JSON.parse(message);
            message = data.detail;
            code = data.code;
        }
        switch (response.status) {
            case 404:
                throw new exceptions_1.ServiceNotFoundError(message);
            case 403:
            case 401:
                throw new exceptions_1.PermissionDeniedError(message);
            case 400:
                throw new exceptions_1.InvalidClientRequestError(message, code);
            default:
                throw new exceptions_1.ServerError(message, code);
        }
    }
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
    async makeCollect(amount, service, payer, date, nonce, trxID, country = 'CM', currency = 'XAF', feesIncluded = true, mode = 'synchronous', conversion = false, location = undefined, customer = undefined, product = undefined, extra = undefined) {
        const endpoint = 'payment/collect/';
        const url = this._buildUrl(endpoint);
        let body = {
            amount,
            service,
            payer,
            country,
            currency,
            fees: feesIncluded,
            conversion,
        };
        if (location) {
            body.location = location;
        }
        if (customer) {
            body.customer = customer;
        }
        if (product) {
            body.product = product;
        }
        if (extra) {
            body = Object.assign(body, extra);
        }
        const authorization = this._getAuthorization('POST', endpoint, date, nonce, { 'content-type': 'application/json' }, body);
        const headers = {
            'x-mesomb-date': String(date.getTime()),
            'x-mesomb-nonce': nonce,
            Authorization: authorization,
            'Content-Type': 'application/json',
            'X-MeSomb-Application': this.applicationKey,
            'X-MeSomb-OperationMode': mode,
        };
        if (trxID) {
            headers['X-MeSomb-TrxID'] = String(trxID);
        }
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers,
        });
        if (response.status >= 400) {
            await this.processClientException(response);
        }
        return new models_1.TransactionResponse(await response.json());
    }
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
     * @param extra Extra parameters to send in the body check the API documentation
     *
     * @return TransactionResponse
     */
    async makeDeposit(amount, service, receiver, date, nonce, trxID, country = 'CM', currency = 'XAF', extra = undefined) {
        const endpoint = 'payment/deposit/';
        const url = this._buildUrl(endpoint);
        let body = { amount, receiver, service, country, currency };
        if (extra) {
            body = Object.assign(body, extra);
        }
        const authorization = this._getAuthorization('POST', endpoint, date, nonce, { 'content-type': 'application/json' }, body);
        const headers = {
            'x-mesomb-date': String(date.getTime()),
            'x-mesomb-nonce': nonce,
            Authorization: authorization,
            'Content-Type': 'application/json',
            'X-MeSomb-Application': this.applicationKey,
        };
        if (trxID) {
            headers['X-MeSomb-TrxID'] = String(trxID);
        }
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers,
        });
        if (response.status >= 400) {
            await this.processClientException(response);
        }
        return new models_1.TransactionResponse(await response.json());
    }
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
    async updateSecurity(field, action, value = null, date = undefined) {
        const endpoint = 'payment/security/';
        const url = this._buildUrl(endpoint);
        if (!date) {
            date = new Date();
        }
        const body = { field, action };
        if (action !== 'UNSET') {
            body.value = value;
        }
        const authorization = this._getAuthorization('POST', endpoint, date, '', { 'content-type': 'application/json' }, body);
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'x-mesomb-date': String(date.getTime()),
                'x-mesomb-nonce': '',
                Authorization: authorization,
                'Content-Type': 'application/json',
                'X-MeSomb-Application': this.applicationKey,
            },
        });
        if (response.status >= 400) {
            await this.processClientException(response);
        }
        return new models_1.Application(await response.json());
    }
    /**
     * Get the current status of your service on MeSomb
     *
     * @param date date of the request
     */
    async getStatus(date = undefined) {
        const endpoint = 'payment/status/';
        if (!date) {
            date = new Date();
        }
        const authorization = this._getAuthorization('GET', endpoint, date, '');
        const response = await fetch(this._buildUrl(endpoint), {
            method: 'GET',
            headers: {
                'x-mesomb-date': String(date.getTime()),
                'x-mesomb-nonce': '',
                Authorization: authorization,
                'X-MeSomb-Application': this.applicationKey,
            },
        });
        if (response.status >= 400) {
            await this.processClientException(response);
        }
        return new models_1.Application(await response.json());
    }
    async getTransactions(ids, date = undefined) {
        const endpoint = `payment/transactions/?ids=${ids.join(',')}`;
        if (!date) {
            date = new Date();
        }
        const authorization = this._getAuthorization('GET', endpoint, date, '');
        const response = await fetch(this._buildUrl(endpoint), {
            method: 'GET',
            headers: {
                'x-mesomb-date': String(date.getTime()),
                'x-mesomb-nonce': '',
                Authorization: authorization,
                'X-MeSomb-Application': this.applicationKey,
            },
        });
        if (response.status >= 400) {
            await this.processClientException(response);
        }
        return await response.json();
    }
    async checkTransactionStatus(...ids) {
        const endpoint = `payment/transactions/check/?ids=${ids.join(',')}&source=EXTERNAL`;
        const url = this._buildUrl(endpoint);
        const nonce = Signature_1.Signature.nonceGenerator();
        const date = new Date();
        const authorization = this._getAuthorization('GET', endpoint, date, nonce);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-mesomb-date': String(date.getTime()),
                'x-mesomb-nonce': nonce,
                Authorization: authorization,
                'X-MeSomb-Application': this.applicationKey
            }
        });
        if (response.status >= 400) {
            await this.processClientException(response);
        }
        return await response.json();
    }
}
exports.PaymentOperation = PaymentOperation;
