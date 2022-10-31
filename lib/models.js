"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = exports.TransactionResponse = void 0;
var TransactionResponse = /** @class */ (function () {
    function TransactionResponse(data) {
        this.success = data.success;
        this.message = data.message;
        this.redirect = data.redirect;
        this.data = data.transaction;
        this.reference = data.reference;
        this.status = data.status;
    }
    TransactionResponse.prototype.isOperationSuccess = function () {
        return this.success;
    };
    TransactionResponse.prototype.isTransactionSuccess = function () {
        return this.success && this.status === 'SUCCESS';
    };
    return TransactionResponse;
}());
exports.TransactionResponse = TransactionResponse;
var Application = /** @class */ (function () {
    function Application(data) {
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
    Application.prototype.getSecurityField = function (field) {
        return this.security[field];
    };
    /**
     * Get current balance
     *
     * @param country
     * @param service
     */
    Application.prototype.getBalance = function (country, service) {
        if (country === void 0) { country = undefined; }
        if (service === void 0) { service = undefined; }
        var balances = this.balances;
        if (country) {
            balances = balances.filter(function (b) { return b.country === country; });
        }
        if (service) {
            balances = balances.filter(function (b) { return b.service === service; });
        }
        return balances.reduce(function (acc, item) { return acc + item.value; }, 0);
    };
    return Application;
}());
exports.Application = Application;
