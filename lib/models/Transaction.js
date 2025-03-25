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
Object.defineProperty(exports, "__esModule", { value: true });
var Customer_1 = require("./Customer");
var Product_1 = require("./Product");
var ATransaction_1 = require("./ATransaction");
/**
 * Transaction model
 *
 * @property {Customer} [customer] - Customer details
 * @property {Product[]} [products] - List of products
 *
 * @extends ATransaction
 */
var Transaction = /** @class */ (function (_super) {
    __extends(Transaction, _super);
    function Transaction(data) {
        var _this = this;
        var _a;
        _this = _super.call(this, data) || this;
        if (data.customer) {
            _this.customer = new Customer_1.default(data.customer);
        }
        _this.products = (_a = data.products) === null || _a === void 0 ? void 0 : _a.map(function (d) { return new Product_1.default(d); });
        return _this;
    }
    return Transaction;
}(ATransaction_1.ATransaction));
exports.default = Transaction;
