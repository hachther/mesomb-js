"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = TransactionResponse;
