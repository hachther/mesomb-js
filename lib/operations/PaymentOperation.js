"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var models_1 = require("../models");
require("isomorphic-fetch");
var AOperation_1 = require("./AOperation");
var RandomGenerator_1 = require("../util/RandomGenerator");
/**
 * Containing all operations provided by MeSomb Payment Service.
 *
 * [Check the documentation here](https://mesomb.hachther.com/en/api/schema/)
 */
var PaymentOperation = /** @class */ (function (_super) {
    __extends(PaymentOperation, _super);
    function PaymentOperation(_a) {
        var applicationKey = _a.applicationKey, accessKey = _a.accessKey, secretKey = _a.secretKey, _b = _a.language, language = _b === void 0 ? 'en' : _b;
        var _this = _super.call(this, { target: applicationKey, accessKey: accessKey, secretKey: secretKey, language: language }) || this;
        _this.service = 'payment';
        return _this;
    }
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
    PaymentOperation.prototype.makeCollect = function (_a) {
        var amount = _a.amount, service = _a.service, payer = _a.payer, nonce = _a.nonce, trxID = _a.trxID, _b = _a.country, country = _b === void 0 ? 'CM' : _b, _c = _a.currency, currency = _c === void 0 ? 'XAF' : _c, _d = _a.fees, fees = _d === void 0 ? true : _d, _e = _a.mode, mode = _e === void 0 ? 'synchronous' : _e, _f = _a.conversion, conversion = _f === void 0 ? false : _f, location = _a.location, customer = _a.customer, products = _a.products, extra = _a.extra;
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, body, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        endpoint = 'payment/collect/';
                        body = {
                            amount: amount,
                            service: service,
                            payer: payer,
                            country: country,
                            currency: currency,
                            amount_currency: currency,
                            fees: fees,
                            conversion: conversion,
                        };
                        if (trxID) {
                            body.trxID = trxID;
                        }
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
                        _g = models_1.TransactionResponse.bind;
                        return [4 /*yield*/, this.executeRequest('POST', endpoint, new Date(), nonce !== null && nonce !== void 0 ? nonce : RandomGenerator_1.RandomGenerator.nonce(), body, mode)];
                    case 1: return [2 /*return*/, new (_g.apply(models_1.TransactionResponse, [void 0, _h.sent()]))()];
                }
            });
        });
    };
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
    PaymentOperation.prototype.makeDeposit = function (_a) {
        var amount = _a.amount, service = _a.service, receiver = _a.receiver, nonce = _a.nonce, trxID = _a.trxID, _b = _a.country, country = _b === void 0 ? 'CM' : _b, _c = _a.currency, currency = _c === void 0 ? 'XAF' : _c, _d = _a.conversion, conversion = _d === void 0 ? false : _d, location = _a.location, customer = _a.customer, products = _a.products, extra = _a.extra;
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, body, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        endpoint = 'payment/deposit/';
                        body = { amount: amount, receiver: receiver, service: service, country: country, currency: currency, conversion: conversion, amount_currency: currency, };
                        if (trxID) {
                            body.trxID = trxID;
                        }
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
                        _e = models_1.TransactionResponse.bind;
                        return [4 /*yield*/, this.executeRequest('POST', endpoint, new Date(), nonce !== null && nonce !== void 0 ? nonce : RandomGenerator_1.RandomGenerator.nonce(), body)];
                    case 1: return [2 /*return*/, new (_e.apply(models_1.TransactionResponse, [void 0, _f.sent()]))()];
                }
            });
        });
    };
    /**
     * Method to refund customer based on a transaction
     *
     * @param id of the transaction
     * @param params{PaymentRefundRequest} refund parameter
     *
     * @return TransactionResponse
     */
    PaymentOperation.prototype.refundTransaction = function (id, _a) {
        var amount = _a.amount, nonce = _a.nonce, _b = _a.conversion, conversion = _b === void 0 ? false : _b, _c = _a.currency, currency = _c === void 0 ? 'XAF' : _c;
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, body, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        endpoint = 'payment/refund/';
                        body = { id: id, currency: currency, conversion: conversion, amount_currency: currency };
                        if (amount) {
                            body.amount = amount;
                        }
                        _d = models_1.TransactionResponse.bind;
                        return [4 /*yield*/, this.executeRequest('POST', endpoint, new Date(), nonce !== null && nonce !== void 0 ? nonce : RandomGenerator_1.RandomGenerator.nonce(), body)];
                    case 1: return [2 /*return*/, new (_d.apply(models_1.TransactionResponse, [void 0, _e.sent()]))()];
                }
            });
        });
    };
    /**
     * Get the current status of your service on MeSomb
     */
    PaymentOperation.prototype.getStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var endpoint, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        endpoint = 'payment/status/';
                        _a = models_1.Application.bind;
                        return [4 /*yield*/, this.executeRequest('GET', endpoint, new Date(), '')];
                    case 1: return [2 /*return*/, new (_a.apply(models_1.Application, [void 0, _b.sent()]))()];
                }
            });
        });
    };
    /**
     * Fetch transactions base on MeSomb IDs or external IDs
     *
     * @param ids: ids of the transactions
     * @param source: origin of the ID of the transactions (MESOMB for MeSomb and EXTERNAL for your system)
     *
     * @return Transaction[]
     */
    PaymentOperation.prototype.getTransactions = function (ids, source) {
        if (source === void 0) { source = 'MESOMB'; }
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "payment/transactions/?ids=".concat(ids.join(','), "&source=").concat(source);
                        return [4 /*yield*/, this.executeRequest('GET', endpoint, new Date(), '')];
                    case 1: return [2 /*return*/, (_a.sent()).map(function (d) { return new models_1.Transaction(d); })];
                }
            });
        });
    };
    /**
     * Check transactions base on MeSomb IDs or external IDs
     *
     * @param ids: ids of the transactions
     * @param source: origin of the ID of the transactions (MESOMB for MeSomb and EXTERNAL for your system)
     *
     * @return Transaction[]
     */
    PaymentOperation.prototype.checkTransactions = function (ids, source) {
        if (source === void 0) { source = 'MESOMB'; }
        return __awaiter(this, void 0, void 0, function () {
            var endpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        endpoint = "payment/transactions/check/?ids=".concat(ids.join(','), "&source=").concat(source);
                        return [4 /*yield*/, this.executeRequest('GET', endpoint, new Date(), '')];
                    case 1: return [2 /*return*/, (_a.sent()).map(function (d) { return new models_1.Transaction(d); })];
                }
            });
        });
    };
    return PaymentOperation;
}(AOperation_1.AOperation));
exports.PaymentOperation = PaymentOperation;
