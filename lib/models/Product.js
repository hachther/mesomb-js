"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Product model
 *
 * @property {string} id - The product's id
 * @property {string} [name] - The product's name
 * @property {string} [category] - The product's category
 * @property {number} quantity - The product's quantity
 * @property {number} amount - The product's amount
 */
var Product = /** @class */ (function () {
    function Product(data) {
        this.data = data;
        this.id = data.id;
        this.name = data.name;
        this.category = data.category;
        this.quantity = data.quantity;
        this.amount = data.amount;
    }
    /**
     * Get the data receive from the server
     *
     * @returns {Record<string, any>}
     */
    Product.prototype.getData = function () {
        return this.data;
    };
    return Product;
}());
exports.default = Product;
