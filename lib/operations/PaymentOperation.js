"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentOperation = void 0;
var Settings_1 = require("../Settings");
var Signature_1 = require("../Signature");
var exceptions_1 = require("../exceptions");
var models_1 = require("../models");
require("isomorphic-fetch");
/**
 * Containing all operations provided by MeSomb Payment Service.
 *
 * [Check the documentation here](https://mesomb.hachther.com/en/api/schema/)
 */
var PaymentOperation = /** @class */ (function () {
    function PaymentOperation(_a) {
        var applicationKey = _a.applicationKey, accessKey = _a.accessKey, secretKey = _a.secretKey;
        this.applicationKey = applicationKey;
        this.accessKey = accessKey;
        this.secretKey = secretKey;
    }
    PaymentOperation.prototype._buildUrl = function (endpoint) {
        return "".concat(Settings_1.default.HOST, "/en/api/").concat(Settings_1.default.APIVERSION, "/").concat(endpoint);
    };
    PaymentOperation.prototype._getAuthorization = function (method, endpoint, date, nonce, headers, body) {
        if (headers === void 0) { headers = {}; }
        if (body === void 0) { body = undefined; }
        var url = this._buildUrl(endpoint);
        var credentials = { accessKey: this.accessKey, secretKey: this.secretKey };
        return Signature_1.Signature.signRequest('payment', method, url, date, nonce, credentials, headers, body || {});
    };
    PaymentOperation.prototype.processClientException = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            var message, code, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, response.text()];
                    case 1:
                        message = _a.sent();
                        if (message.startsWith('{')) {
                            data = JSON.parse(message);
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
                        return [2 /*return*/];
                }
            });
        });
    };
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
    PaymentOperation.prototype.makeCollect = function (amount, service, payer, date, nonce, trxID, country, currency, feesIncluded, mode, conversion, location, customer, product, extra) {
        if (country === void 0) { country = 'CM'; }
        if (currency === void 0) { currency = 'XAF'; }
        if (feesIncluded === void 0) { feesIncluded = true; }
        if (mode === void 0) { mode = 'synchronous'; }
        if (conversion === void 0) { conversion = false; }
        if (location === void 0) { location = undefined; }
        if (customer === void 0) { customer = undefined; }
        if (product === void 0) { product = undefined; }
        if (extra === void 0) { extra = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, url, body, authorization, headers, response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        endpoint = 'payment/collect/';
                        url = this._buildUrl(endpoint);
                        body = {
                            amount: amount,
                            service: service,
                            payer: payer,
                            country: country,
                            currency: currency,
                            fees: feesIncluded,
                            conversion: conversion,
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
                        authorization = this._getAuthorization('POST', endpoint, date, nonce, { 'content-type': 'application/json' }, body);
                        headers = {
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
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                body: JSON.stringify(body),
                                headers: headers,
                            })];
                    case 1:
                        response = _b.sent();
                        if (!(response.status >= 400)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.processClientException(response)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _a = models_1.TransactionResponse.bind;
                        return [4 /*yield*/, response.json()];
                    case 4: return [2 /*return*/, new (_a.apply(models_1.TransactionResponse, [void 0, _b.sent()]))()];
                }
            });
        });
    };
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
    PaymentOperation.prototype.makeDeposit = function (amount, service, receiver, date, nonce, trxID, country, currency, extra) {
        if (country === void 0) { country = 'CM'; }
        if (currency === void 0) { currency = 'XAF'; }
        if (extra === void 0) { extra = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, url, body, authorization, headers, response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        endpoint = 'payment/deposit/';
                        url = this._buildUrl(endpoint);
                        body = { amount: amount, receiver: receiver, service: service, country: country, currency: currency };
                        if (extra) {
                            body = Object.assign(body, extra);
                        }
                        authorization = this._getAuthorization('POST', endpoint, date, nonce, { 'content-type': 'application/json' }, body);
                        headers = {
                            'x-mesomb-date': String(date.getTime()),
                            'x-mesomb-nonce': nonce,
                            Authorization: authorization,
                            'Content-Type': 'application/json',
                            'X-MeSomb-Application': this.applicationKey,
                        };
                        if (trxID) {
                            headers['X-MeSomb-TrxID'] = String(trxID);
                        }
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                body: JSON.stringify(body),
                                headers: headers,
                            })];
                    case 1:
                        response = _b.sent();
                        if (!(response.status >= 400)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.processClientException(response)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _a = models_1.TransactionResponse.bind;
                        return [4 /*yield*/, response.json()];
                    case 4: return [2 /*return*/, new (_a.apply(models_1.TransactionResponse, [void 0, _b.sent()]))()];
                }
            });
        });
    };
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
    PaymentOperation.prototype.updateSecurity = function (field, action, value, date) {
        if (value === void 0) { value = null; }
        if (date === void 0) { date = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, url, body, authorization, response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        endpoint = 'payment/security/';
                        url = this._buildUrl(endpoint);
                        if (!date) {
                            date = new Date();
                        }
                        body = { field: field, action: action };
                        if (action !== 'UNSET') {
                            body.value = value;
                        }
                        authorization = this._getAuthorization('POST', endpoint, date, '', { 'content-type': 'application/json' }, body);
                        return [4 /*yield*/, fetch(url, {
                                method: 'POST',
                                body: JSON.stringify(body),
                                headers: {
                                    'x-mesomb-date': String(date.getTime()),
                                    'x-mesomb-nonce': '',
                                    Authorization: authorization,
                                    'Content-Type': 'application/json',
                                    'X-MeSomb-Application': this.applicationKey,
                                },
                            })];
                    case 1:
                        response = _b.sent();
                        if (!(response.status >= 400)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.processClientException(response)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _a = models_1.Application.bind;
                        return [4 /*yield*/, response.json()];
                    case 4: return [2 /*return*/, new (_a.apply(models_1.Application, [void 0, _b.sent()]))()];
                }
            });
        });
    };
    /**
     * Get the current status of your service on MeSomb
     *
     * @param date date of the request
     */
    PaymentOperation.prototype.getStatus = function (date) {
        if (date === void 0) { date = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, authorization, response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        endpoint = 'payment/status/';
                        if (!date) {
                            date = new Date();
                        }
                        authorization = this._getAuthorization('GET', endpoint, date, '');
                        return [4 /*yield*/, fetch(this._buildUrl(endpoint), {
                                method: 'GET',
                                headers: {
                                    'x-mesomb-date': String(date.getTime()),
                                    'x-mesomb-nonce': '',
                                    Authorization: authorization,
                                    'X-MeSomb-Application': this.applicationKey,
                                },
                            })];
                    case 1:
                        response = _b.sent();
                        if (!(response.status >= 400)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.processClientException(response)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _a = models_1.Application.bind;
                        return [4 /*yield*/, response.json()];
                    case 4: return [2 /*return*/, new (_a.apply(models_1.Application, [void 0, _b.sent()]))()];
                }
            });
        });
    };
    PaymentOperation.prototype.getTransactions = function (ids, date) {
        if (date === void 0) { date = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, authorization, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "payment/transactions/?ids=".concat(ids.join(','));
                        if (!date) {
                            date = new Date();
                        }
                        authorization = this._getAuthorization('GET', endpoint, date, '');
                        return [4 /*yield*/, fetch(this._buildUrl(endpoint), {
                                method: 'GET',
                                headers: {
                                    'x-mesomb-date': String(date.getTime()),
                                    'x-mesomb-nonce': '',
                                    Authorization: authorization,
                                    'X-MeSomb-Application': this.applicationKey,
                                },
                            })];
                    case 1:
                        response = _a.sent();
                        if (!(response.status >= 400)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.processClientException(response)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, response.json()];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return PaymentOperation;
}());
exports.PaymentOperation = PaymentOperation;
