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
var MeSomb_1 = require("../MeSomb");
var Signature_1 = require("../Signature");
var InvalidClientRequestError_1 = require("../exceptions/InvalidClientRequestError");
var PermissionDeniedError_1 = require("../exceptions/PermissionDeniedError");
var ServerError_1 = require("../exceptions/ServerError");
var ServiceNotFoundError_1 = require("../exceptions/ServiceNotFoundError");
var Application_1 = require("../models/Application");
var TransactionResponse_1 = require("../models/TransactionResponse");
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
        return "".concat(MeSomb_1.default.HOST, "/en/api/").concat(MeSomb_1.default.APIVERSION, "/").concat(endpoint);
    };
    PaymentOperation.prototype._getAuthorization = function (method, endpoint, date, nonce, headers, body) {
        if (headers === void 0) { headers = {}; }
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
                                throw new ServiceNotFoundError_1.default(message);
                            case 403:
                            case 401:
                                throw new PermissionDeniedError_1.default(message);
                            case 400:
                                throw new InvalidClientRequestError_1.default(message, code);
                            default:
                                throw new ServerError_1.default(message, code);
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
    PaymentOperation.prototype.makeCollect = function (_a) {
        var amount = _a.amount, service = _a.service, payer = _a.payer, _b = _a.date, date = _b === void 0 ? new Date() : _b, nonce = _a.nonce, trxID = _a.trxID, _c = _a.country, country = _c === void 0 ? 'CM' : _c, _d = _a.currency, currency = _d === void 0 ? 'XAF' : _d, _e = _a.feesIncluded, feesIncluded = _e === void 0 ? true : _e, _f = _a.mode, mode = _f === void 0 ? 'synchronous' : _f, _g = _a.conversion, conversion = _g === void 0 ? false : _g, location = _a.location, customer = _a.customer, products = _a.products, extra = _a.extra;
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, url, body, authorization, headers, response, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
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
                        if (products) {
                            body.products = Array.isArray(products) ? products : [products];
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
                        response = _j.sent();
                        if (!(response.status >= 400)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.processClientException(response)];
                    case 2:
                        _j.sent();
                        _j.label = 3;
                    case 3:
                        _h = TransactionResponse_1.default.bind;
                        return [4 /*yield*/, response.json()];
                    case 4: return [2 /*return*/, new (_h.apply(TransactionResponse_1.default, [void 0, _j.sent()]))()];
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
     * @param location object containing the location of the customer check the documentation
     * @param customer object containing information of the customer check the documentation
     * @param product object containing information of the product check the documentation
     * @param extra Extra parameters to send in the body check the API documentation
     *
     * @return TransactionResponse
     */
    PaymentOperation.prototype.makeDeposit = function (_a) {
        var amount = _a.amount, service = _a.service, receiver = _a.receiver, _b = _a.date, date = _b === void 0 ? new Date() : _b, nonce = _a.nonce, trxID = _a.trxID, _c = _a.country, country = _c === void 0 ? 'CM' : _c, _d = _a.currency, currency = _d === void 0 ? 'XAF' : _d, location = _a.location, customer = _a.customer, products = _a.products, extra = _a.extra;
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, url, body, authorization, headers, response, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        endpoint = 'payment/deposit/';
                        url = this._buildUrl(endpoint);
                        body = { amount: amount, receiver: receiver, service: service, country: country, currency: currency };
                        if (location) {
                            body.location = location;
                        }
                        if (customer) {
                            body.customer = customer;
                        }
                        if (products) {
                            body.products = Array.isArray(products) ? products : [products];
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
                        response = _f.sent();
                        if (!(response.status >= 400)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.processClientException(response)];
                    case 2:
                        _f.sent();
                        _f.label = 3;
                    case 3:
                        _e = TransactionResponse_1.default.bind;
                        return [4 /*yield*/, response.json()];
                    case 4: return [2 /*return*/, new (_e.apply(TransactionResponse_1.default, [void 0, _f.sent()]))()];
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
                        _a = Application_1.default.bind;
                        return [4 /*yield*/, response.json()];
                    case 4: return [2 /*return*/, new (_a.apply(Application_1.default, [void 0, _b.sent()]))()];
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
                        _a = Application_1.default.bind;
                        return [4 /*yield*/, response.json()];
                    case 4: return [2 /*return*/, new (_a.apply(Application_1.default, [void 0, _b.sent()]))()];
                }
            });
        });
    };
    PaymentOperation.prototype.getTransactions = function (ids, date) {
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
