"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Product = /** @class */ (function () {
    function Product(data) {
        this.name = data.name;
        this.category = data.category;
        this.quantity = data.quantity;
        this.amount = data.amount;
    }
    return Product;
}());
exports.default = Product;
