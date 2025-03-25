"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction_1 = require("./Transaction");
/**
 * Represents the response of a transactional operation.
 *
 * @class TransactionResponse
 *
 * @property {boolean} success - Indicates if the operation was successful.
 * @property {string} message - Message associated with the transaction response.
 * @property {string} redirect - URL to redirect if needed.
 * @property {Transaction} transaction - The transaction details.
 * @property {string} reference - Reference ID of the transaction.
 * @property {'SUCCESS' | 'FAILED' | 'PENDING'} status - Status of the transaction.
 *
 * @see {@link Transaction}
 */
var TransactionResponse = /** @class */ (function () {
    /**
     * Creates an instance of TransactionResponse.
     * @param {Record<string, any>} data - The data to initialize the response.
     */
    function TransactionResponse(data) {
        this.success = data.success;
        this.message = data.message;
        this.redirect = data.redirect;
        this.transaction = new Transaction_1.default(data.transaction);
        this.reference = data.reference;
        this.status = data.status;
    }
    /**
     * Checks if the operation was successful.
     * @returns {boolean} True if the operation was successful, otherwise false.
     */
    TransactionResponse.prototype.isOperationSuccess = function () {
        return this.success;
    };
    /**
     * Checks if the transaction was successful.
     * @returns {boolean} True if the transaction was successful, otherwise false.
     */
    TransactionResponse.prototype.isTransactionSuccess = function () {
        var _a;
        return ((_a = this.transaction) === null || _a === void 0 ? void 0 : _a.isSuccess()) === true;
    };
    return TransactionResponse;
}());
exports.default = TransactionResponse;
