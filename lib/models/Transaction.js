"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Customer_1 = require("./Customer");
var Location_1 = require("./Location");
var Product_1 = require("./Product");
var Transaction = /** @class */ (function () {
    function Transaction(data) {
        var _a;
        this.pk = data.pk;
        this.success = data.success;
        this.type = data.type;
        this.amount = data.amount;
        this.fees = data.fees;
        this.b_party = data.b_party;
        this.message = data.message;
        this.service = data.service;
        this.reference = data.reference;
        this.ts = data.ts;
        this.country = data.country;
        this.currency = data.currency;
        this.fin_trx_id = data.fin_trx_id;
        this.trxamount = data.trxamount;
        if (data.location) {
            this.location = new Location_1.default(data.location);
        }
        if (data.customer) {
            this.customer = new Customer_1.default(data.customer);
        }
        this.products = (_a = data.products) === null || _a === void 0 ? void 0 : _a.map(function (d) { return new Product_1.default(d); });
    }
    return Transaction;
}());
exports.default = Transaction;
