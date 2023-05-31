"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = exports.TransactionResponse = void 0;
class TransactionResponse {
    constructor(data) {
        this.success = data.success;
        this.message = data.message;
        this.redirect = data.redirect;
        this.data = data.transaction;
        this.reference = data.reference;
        this.status = data.status;
    }
    isOperationSuccess() {
        return this.success;
    }
    isTransactionSuccess() {
        return this.success && this.status === 'SUCCESS';
    }
}
exports.TransactionResponse = TransactionResponse;
class Application {
    constructor(data) {
        this.key = data.key;
        this.logo = data.logo;
        this.balances = data.balances;
        this.countries = data.countries;
        this.description = data.description;
        this.isLive = data.is_live;
        this.name = data.name;
        this.security = data.security;
        this.status = data.status;
        this.url = data.url;
    }
    getSecurityField(field) {
        return this.security[field];
    }
    /**
     * Get current balance
     *
     * @param country
     * @param service
     */
    getBalance(country = undefined, service = undefined) {
        let balances = this.balances;
        if (country) {
            balances = balances.filter((b) => b.country === country);
        }
        if (service) {
            balances = balances.filter((b) => b.service === service);
        }
        return balances.reduce((acc, item) => acc + item.value, 0);
    }
}
exports.Application = Application;
